import error from "./error.js";
import jwt from "jsonwebtoken";

let Verify = {}
Verify.token = (req,res,next)=>{
    const token = req.cookie.access_token;
    if(!token) return next(error.create(401,"You are not authentication."))

    jwt.verify(token,process.env.JWT ,(err,user)=>{
        if(err) return next(error.create(403,"Token is not valid."));
        req.user = user;
        next();
    });
}
Verify.user = (req,res,next)=>{
    Verify.token(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            next(error.create(403,"You are not authurized."));
        }
    });
}

Verify.admin = (req,res,next)=>{
    Verify.token(req,res,()=>{
        if(req.user.isAdmin){
            next();
        } else{
            next(error.create(403,"You are not authurized."));
        }
    });
}
export default Verify;