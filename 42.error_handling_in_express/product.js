const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true,
        min:1
    }
});

const Products=mongoose.Model("Products",productSchema);

module.exports=Products;