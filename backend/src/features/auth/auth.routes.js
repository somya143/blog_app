const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Auth = require("./auth.model");

app.post("/refresh", async (req, res) => {
    // redis.push(token)
    try {
      const { refreshToken } = req.body;
      const verification = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET@1991");
      const user = await Auth.findOne({ email: verification.email });
      const { email, name, password } = user;
      const token = jwt.sign({ name, email, password }, "SECRET@1991", {
        expiresIn: "5 minutes",
      });
      res.send({ error: false, token, message: "new token generated" });
    } catch (e) {
      // redis.push(rToken)
      res.send({ error: true, message: e.message });
    }
  });

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
    return res.status(201).send({message:"Viewer created successfully" , user});
})

app.post("/login" , async(req,res) => {
    const { email , password } = req.body
  try {
    const user = await Auth.findOne({ email });
    const match = await argon2.verify(user.password, password);
    if (match) {
      const token = jwt.sign(
        { id: user._id, email, password: user.password, name: user.name },
        "SECRET@1991",
        {
          expiresIn: "7 days",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id, email, password: user.password, name: user.name },
        "REFRESH_TOKEN_SECRET@1991",
        { expiresIn: "28 days" }
      );
      return res.send({
        error: false,
        message: "sign in successful",
        name: user.name,
        token,
        refreshToken,
      });
    } else {
      return res.send({ error: true, message: "Wrong Password!!" });
    }
  } catch (e) {
    res.send({ error: true, message: "Wrong Credential!!" });
  }
})

module.exports = app;