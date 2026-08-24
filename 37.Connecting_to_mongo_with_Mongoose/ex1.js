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

//4. create a user inside a route

const app=express();

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});

app.post("/users",async (req,res)=>{
    try{
    const user=await User.create(req.body);
    res.json(user);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
});

//5.Insert many users
app.post("/users/many",async (req,res)=>{
    try{
        const user=await User.insertMany(req.body);
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//6.find all users
app.get("/users",async (req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//7.Find one user
app.get("/users/email/:email", async(req,res)=>{
    try{
        const user=await User.findOne({email:req.params.email});
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//8.Find user by id
//app.get("/users/:id",async (req,res)=>{
//     try{
//         const user= await User.findById(req.params.id);
//         res.json(user);
//     }
//     catch(error){
//         res.status(400).json({error:error.message});
//     }
// });
//9.query operators
app.get("/user/adults",async (req,res)=>{
    try{
        const users=await User.find({age:{$gte:18}});
        res.json(users);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

app.get("/users/young", async(req,res)=>{
    try{
        const users=await User.find({age:{$lt:30}});
        res.json(users);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

app.get("/users/admins",async (req,res)=>{
    try{
        const user=await User.find({role:{$in:["user","admin"]}});
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});


app.get("/users/:id",async (req,res)=>{
    try{
        const user= await User.findById(req.params.id);
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});//you gotta always keep /:id in the end for the pattern recognition to not fail


//10.Updating one user
app.patch("/users/email/:email",async (req,res)=>{
    try{
        const user=await User.updateOne({email:req.params.email},{age:req.body.age},{runValidators:true});
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//11.Update Many users
app.patch("/users/deactivate",async (req,res)=>{
    try{
        const user=await User.updateMany({role:"user"},{$set:{role:"deactivated"}},{runValidators:true});
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//12.find by id and update
app.patch("/users/:id",async (req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{$set:{age:10}},{new:true,runValidators:true});
        res.json(user);
    }
    catch(error){
        res.json({error:error.message});
    }
});

//13.Validation error handling
