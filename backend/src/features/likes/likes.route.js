const express = require("express");
const Blog = require("../blog/blogs.model");
const app = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

app.patch("/likeBlog" ,authMiddleware, async(req,res) => {
    try {
    const { blogId , likesCount } = req.body;
    const likedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            likesCount,
            $addToSet :{ likes : req.id },
        },
        {new:true})
    .populate({path: "author" , select:["_id","name","email"]})
    .populate({path: "comment.commentAuthor" , select:["_id","name","email"]})
    .populate({path : "likes" , select:["_id","name","email"]});
    return res.status(200).send({error:false,data:likedBlog,message:"Liked blog successfully"})
   } catch (error) {
   return res.status(400).send({error:true,message:error.message})
   }
});

app.patch("/unlikeBlog" ,authMiddleware, async(req,res) => {
    const {blogId , likesCount} = req.body;
    try {
        const unlikedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
             $pull:{likes:req.id},
             likesCount
            },
            {new:true}
        )
    .populate({path: "author" , select:["_id","name","email"]})
    .populate({path: "comment.commentAuthor" , select:["_id","name","email"]})
    .populate({path : "likes" , select:["_id","name","email"]});
    return res.status(200).send({error:false,data:unlikedBlog,message:"Blog unliked successfully"})
    } catch (error) {
    return res.status(400).send({error:true , message: error.message})    
    }
})

module.exports = app;