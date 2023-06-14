const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentAuthor : {type:mongoose.Schema.Types.ObjectId,required: true,ref : "auth"},
    comment : {type:String, required: true}
},
{
    timestamps: true,
    versionKey:false
}
)
const blogSchema = new mongoose.Schema({
 title: {type: String, required:true},
 content: {type: String, required:true},
 likes: [{
   likesCount: {type: Number, required:true,default:0}
},
{
    type: mongoose.Types.ObjectId,
    ref: "auth",
    required: true
}
],
 comment: [commentSchema],
 image:{type: String, default:"https://images.pexels.com/photos/963278/pexels-photo-963278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}

},
{
    versionKey:false,
    timestamps:true
}
);

const Blog = mongoose.model("blog" , blogSchema);

module.exports = Blog