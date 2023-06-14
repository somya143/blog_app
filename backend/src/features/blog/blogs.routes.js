const express = require("express");
const Blog = require("./blogs.model");
const app = express.Router();

app.get("/" , async(req,res) => {
    try {
        const blog = await Blog.find();
        if(!blog){
            return res.status(400).send("blog not found")
        }else{
            return res.status(201).send("blog found successfully")
        }
    } catch (error) {
         return res.status(401).send(error.message)
    }
});

app.post("/" , async(req,res) => {
    
})