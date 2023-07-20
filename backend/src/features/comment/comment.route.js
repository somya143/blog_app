const express = require("express");
const app = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const Blog = require("../blog/blogs.model");

app.post("/" , authMiddleware , async(req,res) => {
const {blogId,comment:commentString} = req.body;
try {
    const postComment = await Blog.findByIdAndUpdate(
        blogId,
        {
            $push:{comment : {$each:[{commentString, commentAuthor:req.id}], $position:0}}
        },
        {
          new:true  
        }
    )
    .populate({path: "author" , select:["_id","name","email"]})
    .populate({path: "comment.commentAuthor" , select:["_id","name","email"]})
    .populate({path : "likes" , select:["_id","name","email"]});
    return res.status(200).send({error:false, message:"comment done successfully", commentData:postComment})
} catch (error) {
    return res.status(400).send({error:true, message:error.message})
}
})

app.patch("/" , async(req,res) => {
    const {blogId , commentId} = req.body;
    try {
        const deleteComment = await Blog.findByIdAndUpdate(blogId,
            {
             $pull:{comment:{_id:commentId}}
            },
            {new:true}
            )
            .populate({path: "author" , select:["_id","name","email"]})
            .populate({path: "comment.commentAuthor" , select:["_id","name","email"]})
            .populate({path : "likes" , select:["_id","name","email"]});
            return res.status(200).send({ error:false, message:"comment deleted successfully", data:deleteComment })
    } catch (error) {
           return res.status(400).send({ error:true, message: error.message})
    }
})

module.exports = app;