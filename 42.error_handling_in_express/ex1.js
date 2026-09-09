const catchAsync=require('./class.js');
const Products=require('./product.js');
const mongoose=require('mongoose');
const express=require('express');

const app=express();

app.get("/products/:id",catchAsync(async (req,res,next)=>{
    const id=req.params.id;
    const p=await Products.findById(id);
    res.send(json(p));
}));

app.get("/test-error",catchAsync(async (req,res,next)=>{
    
}));

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});