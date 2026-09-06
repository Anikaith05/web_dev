const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');

const app=express();

//5.
const auth=(req,res,next)=>{
    const {password}=req.query;
    if(password==="Alien123"){
        return next();
    }
    res.send("Invalid password");
};
//.5.

app.use(morgan("dev"));
//3.
const addTimestamp=(req,res,next)=>{
    req.timestamp=Date.now();
    next();
};
//.3.

//4.
const logA=(req,res,next)=>{
    console.log("Middleware in A");
    next();
};

const logB=(req,res,next)=>{
    console.log("Middleware in B");
    next();
};
//.4.

//2.
app.use((req,res,next)=>{
    console.log(req.method);
    console.log(req.path);
    next();
});

app.get("/",(req,res)=>{
    res.send("home page");
});

app.get("/cats",(req,res)=>{
    res.send("meow");
});
//.2.

//3.
app.get("/time",addTimestamp,(req,res)=>{
    res.send(`Request received at: ${req.timestamp}`);
});
//.3.

//4.
app.get("/chain",[logA,logB],(req,res)=>{
    res.send("you hit the chained route");
});
//.4.

//5.
app.get("/secret",auth,(req,res)=>{
    res.send("Aliens are real!!");
});

//6.
app.get("/admin", auth, (req, res) => {
  res.send("welcome to the admin area");
});

app.get("/discount", auth, (req, res) => {
  res.send("here's your secret discount code: EXPRESS10");
});

//7.
app.use((req,res)=>{
    res.status(404).send("Not found!");
});
//.7.

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});