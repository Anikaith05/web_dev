
const {v4 :uuid}=require('uuid');
const path=require('path');
const express=require('express');
const app=express();
const id=uuid();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


const { v4: uuidv4 } = require("uuid");

const notes = [
  {
    id: uuidv4(),
    title: "Learn Express",
    content: "Practice RESTful routes today",
  },
  {
    id: uuidv4(),
    title: "Revise Middleware",
    content: "Understand how express.json() and express.urlencoded() work",
  },
  {
    id: uuidv4(),
    title: "Build Notes API",
    content: "Create GET, POST, PATCH, and DELETE routes for notes",
  },
  {
    id: uuidv4(),
    title: "Practice EJS",
    content: "Create reusable partials for the head, navbar, and footer",
  },
  {
    id: uuidv4(),
    title: "Database Research",
    content: "Compare PostgreSQL and MongoDB for the notes application",
  },
];

app.get("/notes",(req,res)=>{
    res.render("notes/index",{notes});
});

app.get("/notes/new",(req,res)=>{
    res.render("notes/new");
});

app.post("/notes",(req,res)=>{
    const {id1,title1,content1}=req.body;
    notes.push({id:id1,title:title1,content:content1});
});

app.get("notes/:id",(req,res)=>{
    const {id}=req.params;
    const note=notes.find((n)=>n.id==id);
    res.render("show",{note});
});

app.get("notes/:id/edit",(req,res)=>{
    const {id1,title1,content1}=req.params;
    const note=notes.find((n)=>n.id==id1);
    note.id=id1;
    note.title=title1;
    note.content=content1;
});

app.patch("/notes/:id",(req,res)=>{
    
});

app.delete("/notes/:id",(req,res)=>{

});