const jwt = require("jsonwebtoken");
const Auth = require("../features/auth/auth.model");

const authMiddleware = async(req,res,next) => {
    const token = req.headers["authorization"];
    if(!token){
      return res.status(401).send({message : "Token not found"})       
    }
    try {
        const verification = jwt.verify(token , "SECRET@1991");
        if(verification){
            const auth = await Auth.findOne({email: verification.email});
            if(!auth || auth.password !== verification.password){
                return res.send("Invalid token found in the request")
            }else{
                req.id = auth._id
            }
        }
        next();
    } catch (error) {
        return res.status(401).send(error.message)
    }
}

module.exports = authMiddleware;
