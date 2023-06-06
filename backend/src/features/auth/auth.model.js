const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name : {type:String, required :[true, "Please provide your name"]},
    age : {type:Number , reuqired : [true, "Please provide your age"]},
    email: {type:String , required: [true, "Please provide your age"],unique:true},
    password: {type:String, required: [true, "Please provide your password"]},
    role:{type:String , enum : ["author","viewer","admin"], default: "viewer"}
}, 
{
    versionKey: false,
    timestamps: true
}
);

const Auth = mongoose.model("auth" , authSchema);

module.exports = Auth;