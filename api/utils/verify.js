const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.cookies.user_cookie;
    if(!token){
        res.send({msg:"Unauthorize"})
        return next("Error");
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,res)=>{
        if(err){
            res.send({msg:"Token tempered"});
            return next("Error");
        }
        req.user = res;
        next();
    })
}

module.exports = verifyToken;