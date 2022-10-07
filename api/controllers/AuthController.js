import User from "../models/User.js"
import bcrypt from "bcrypt";
import error from "../utils/error.js"
import jwt from "jsonwebtoken";

let AuthControllers = {}

AuthControllers.register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
        })

        await newUser.save();
        res.status(200).send("User has been created.")
    } catch (err) {
        next(err);
    }
}

AuthControllers.login = async (req,res,next)=>{
    try {

        const user = await User.findOne({username:req.body.username})
        if(!user) return next(error.create(404,"User not found."));

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(error.create(400,"Wrong password or username."));

        const token = jwt.sign(
            {id:user._id,isAdmin:user.isAdmin},
            process.env.JWT
        );

        const {password,isAdmin,...otherDetail} = user._doc;
        res
          .cookie("access_token",token,{
            httpOnly:true,
          })
          .status(200)
          .json({...otherDetail});
    } catch (err) {
        next(err);
    }
}
export default AuthControllers;