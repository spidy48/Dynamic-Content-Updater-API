const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
//server restars id may be new
var methodOverride = require('method-override')
//we can not call patch directly like method="patch" from html so we will use 
//method override where we can change get or post method to patch or delete with this
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:true}));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   
        id:uuidv4(),
        username:"spidy",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"rishik",
        content:"Hardwork is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"honey",
        content:"I got selected",
    },
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    //to return this post individually need anothr page
})

//patch if u want update for an id u will send this request
//for here using hoppscoth


app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts"); 
})

//for patch when u change details and clck submit
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
     
    let newContent=req.body.content;

    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
})
//for edit button when u click
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

//to delete
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening on port 8080");
})