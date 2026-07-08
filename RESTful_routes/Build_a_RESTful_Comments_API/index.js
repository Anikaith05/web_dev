const express=require('express');
const path=require('path');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let comments = [
  { id: 1, username: "anikaith", text: "REST is starting to make sense!" },
  { id: 2, username: "sam", text: "Express routes are useful." }
];

app.get('/comments',(req,res)=>{
    if(comments.length!=0){
        res.json(comments);
    }
    else{
        res.status(404).send("the comment section is empty");
    }
});

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    let comment=comments.find((c)=>c.id==id);
    if(comment){
        res.json(comment);
    }
    else{
        res.status(404).send("Comment not found!");
    }
});

app.post('/comments',(req,res)=>{
    const comment=req.body;
    if(!comment){
        res.status(400).send("Please post the comment json object!");
    }
    comments.push(comment);
    res.status(201).json(comments);
});

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find((c)=>c.id==id);
    const {message}=req.body;
    if(!message){
        res.send("Enter the text to be updated");
    }
    res.status(201).json(comments);
});

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const i=comments.findIndex((c)=>c.id==id);
    if(i===-1){
        res.status(404).send("Comment not found!");
    }
    comments.splice(i,1);
    res.status(201).json(comments);
});

app.listen(8080,()=>{
    console.log("The serve is running on port 8080");
});