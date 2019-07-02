var mongoose = require("mongoose");
var Campgrounds = require("./models/campground");
var Comments = require("./models/comments");

var data = [
    {
        name:"Manali",
        image:"https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
    {
        name:"Kasol",
        image:"https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
    {
        name:"Parvati",
        image:"https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
    {
        name:"Snow Masti",
        image:"https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
    {
        name:"Gangtok",
        image:"https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
    {
        name:"Compton",
        image:"https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        discription:"This place is great but i wish it had internet.",
    },
];

function seedDB() {

    Campgrounds.remove({},function (err) {
    //     if (err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         console.log("deleted all campgrounds");
    //         data.forEach(function (campground) {
    //
    //             Campgrounds.create(campground,function (err,campground) {
    //                 if (err)
    //                 {
    //                     console.log (err)
    //                 }
    //                 else{
    //                     console.log("Created a campground");
    //                     Comments.create({
    //                         text:"This place is great but i wish it had internet",
    //                         author:"The Rock"
    //                     },function (err,comment) {
    //                         if (err)
    //                         {
    //                             console.log(err);
    //                         }
    //                         else
    //                         {
    //                             console.log("Created comment");
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                         }
    //
    //                     })
    //
    //                 }
    //
    //             })
    //
    //         });
    //
    //     }
    //
     });

};

module.exports = seedDB;