const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const CampGround=require('./campground.js');

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/campground",async (req,res)=>{
    const camps=await CampGround.find({});
    res.render('list',{camps});
});

app.get("/ncampground",async (req,res)=>{
    res.render("form");
});

app.post("/campground",async (req,res)=>{
    const camp=await CampGround.create(req.body);
    res.redirect("/campground");
})

app.listen(3000,()=>{
    console.log("Listening on port 3000!");
});