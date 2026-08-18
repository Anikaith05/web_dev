const mongoose=require('mongoose');
const express=require('express');


//1.Connect with mongoose
mongoose.connect("mongodb://localhost:27017/mongoosePractice")
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("Connection error:",err);
});

//2.creating the user schema
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:30
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    },
    age:{
        type: Number,
        requires: true,
        min: 18,
        max: 100
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    role:{
    type: String,
    enum:["user","admin"],
    default: "user"
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

//3.create the model
const User=new mongoose.model("User",userSchema);

