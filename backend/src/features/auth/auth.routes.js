const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Auth = require("./auth.model");

app.post("/signup" , async(req,res) => {
    const { name,email,password,age} = req.body;
    const token = req.headers["authorization"];
    const hash = await argon2.hash(password);
    try {
        if(token){
            let decoded = jwt.decode(token , "SECRET@1991");
            if(decoded && decoded.role === "admin"){
                const user = new Auth({name, email, password:hash, age, role:"author"});
                await user.save();
                return res.status(201).send("Author created successfully")
            }else{
                return res.status(403).send("You are not allowed to create author")
            }
        }
    } catch (error) {
        return res.status(401).send("Non admin user tried to create author")
    }

    const user = new Auth({ name,email,password:hash,age });
    await user.save();
    return res.status(201).send("Viewer created successfully");
})

app.post("/login" , async(req,res) => {
    const { email , password } = req.body;
    try {
        const user = await Auth.findOne({email})
        let matched = await argon2.verify(user.password,password);
        if(matched){
         const token = jwt.sign({id:user.id , name:user.name , email:user.email , password:user.password , role:user.role}, 
            "SECRET@1991" , {expiresIn: "7 days"});
          const refreshToken = jwt.sign({id:user.id , name:user.name , email:user.email , password:user.password , role:user.role}, 
            "REFRESH_TOKEN_SECRET@1991" , {expiresIn: "28 days"}) ;
            return res.status(201).send({message:"Token send successfully" , token, refreshToken})
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

module.exports = app;