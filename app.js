var express       = require("express"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser    = require("body-parser"),
    User          = require("./models/user"),
    mongoose      = require("mongoose"),
    seedDB        = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true } );
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use( require("express-session")({
    secret:"I am a disco Dancer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs");
// seedDB();

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

Campground = require(__dirname+"/models/campground");
Comments = require(__dirname+"/models/comments");

app.use(function (req,res,next) {

    res.locals.currentUser = req.user;
    next();

});

app.get("/",function (req,res) {


    res.render("landing");

});

app.get("/campgrounds",function (req,res) {

    Campground.find({},function (err,allcampgrounds) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("campground/index",{campgrounds:allcampgrounds});
        }

    })

});

app.post("/campgrounds",isLoggedIn,function (req,res) {

    var name = req.body.name,
        image_url = req.body.image,
        discription = req.body.discription,
        obj = {name:name,image:image_url,discription:discription};

    Campground.create(obj,function (err,campground) {

    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log(campground);
        res.redirect("/campgrounds");
    }
});



});

app.get("/campgrounds/new",isLoggedIn,function (req,res) {

    res.render("campground/new");

});

app.get("/campgrounds/:id",function (req,res) {

    Campground.findById(req.params.id).populate("comments").exec(function (err,foundcampground) {

        if (err)
        {
            console.log(err)
        }
        else
        {
            res.render("campground/show",{campground: foundcampground})
        }

    })

});
app.get("/campgrounds/:id/comments/new",isLoggedIn,function (req,res) {

    Campground.findById(req.params.id,function (err,foundCampground) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{campground: foundCampground});
        }

    })

});

app.post("/campgrounds/:id/comments",isLoggedIn,function (req,res) {

    Campground.findById(req.params.id,function (err,foundCampground) {
        if (err)
        {
            console.log(err)

        }
        else
        {
            Comments.create(req.body.comment,function (err,createdComment) {

                if (err)
                {
                    console.log(err)
                }
                else
                {   createdComment.author.id = req.user._id ;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/"+foundCampground._id);
                }

            });
        }
    });

});

//====================authenticate==============================
app.get("/register",function (req,res) {

    res.render("register")

});


app.post("/register",function (req,res) {
    
    var newUser = new User({username:req.body.username}); 
   User.register(newUser,req.body.password,function (err,user) {

       if (err)
       {
           console.log(err);
           return render("register");
       }

       passport.authenticate("local")(req,res,function () {

           res.redirect("/campgrounds")

       })
       
   }) 
    
});
app.get("/login",function (req,res) {

    res.render("login");

});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function (req,res) {

});
app.get("/logout",function (req,res) {

    req.logout();
    res.redirect("/campgrounds");

});
function isLoggedIn(req,res,next)
{
    if (req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
//=====================authenticate=============================

app.listen(3000,function () {
   console.log("listening on port 3000, Yelp camp is running ");
});