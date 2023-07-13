const express = require("express");
const Blog = require("./blogs.model");
const authMiddleware = require("../../middleware/authMiddleware");
const app = express.Router();

app.get("/" , async(req,res) => {
    try {
        const blog = await Blog.find().sort({_id:-1}).populate({path: "author" , select:["name","_id","email","age"]})
        .populate({path: "comment.commentAuthor" , select:["name","_id","email","age"]})
        .populate({path: "likes" , select: ["name","_id","email","age"]});
        
        if(!blog){
            return res.status(400).send("blog not found")
        }else{
            console.log(blog)
            console.log(Array.isArray(blog))
            return res.status(200).send({message:"blog found successfully", blog})
        }
    } catch (error) {
         return res.status(401).send(error.message)
    }
});

app.get("/:id" , async(req,res) => {
    let id = req.params.id;
    try {
        const blog = await Blog.findById(id)
        .populate({path:"author", select:["name","_id","email","age"]})
        .populate({path: "comment.commentAuthor" , select:["name","_id","email","age"]})
        .populate({path: "likes" , select:["name","_id","email","age"]});
        return res.status(201).send(blog)
    } catch (error) {
        return res.status(401).send(error.message);
    }
})

app.post("/" , authMiddleware ,async(req,res) => {
 const {title,content,image} = req.body;
 try {
    const post = await (await Blog.create({author:req.id,title,content,image})).populate({path:"author" , select:["name","_id","email","age"]})
    console.log(post)
    return res.send({message:"blog created succesfully" , post})
 } catch (error) {
    return res.send(error.message)
 }
});

app.delete("/:id" , authMiddleware , async(req,res) => {
    let { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if(!req.id.equals(blog.author)){
            return res.send("You are not authorized to delete this blog")
        }else{
         const deleteBlog = await Blog.findByIdAndDelete(id);
         return res.send({message:"blog deleted successfully" , deleteBlog})
        }
        
    } catch (error) {
        return res.send(error.message)
    }
})

app.patch("/:id" , authMiddleware , async(req,res) => {
    let { id } = req.params;
    let { title, content } = req.body;
    try {
        const blog = await Blog.findById(id);
        if(!req.id.equals(blog.author)){
          return res.send("You are not authorized to change data");
        }else{
            const patchData = await Blog.findByIdAndUpdate(id,{title,content},{new:true})
            .populate({path:"author" , select:["name","_id","email","age"]})
            .populate({path:"likes" , select:["name","_id","email","age"]})
            .populate({path:"comment.commentAuthor", select:["name","_id","email","age"]});
            return res.send({message:"Blog updated successfully",patchData})
        }
    } catch (error) {
        return res.send(error.message);
    }
})


module.exports = app;