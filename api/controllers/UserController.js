import User from "../models/User.js";
import response from "../utils/response.js"

let UserControllers = {}

UserControllers.update = async (req,res,next)=>{
    const data = [];
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        data.push(updateUser);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};
//DELETE
UserControllers.delete = async (req,res,next)=>{
    const data = [];
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).send(response.create(true,data,"User has been deleted."));
        
    } catch (err) {
        next(err);
    }
};
//GET
UserControllers.getById = async(req,res,next)=>{
    const data = [];
    try {
        const user = await User.findById(
            req.params.id,
        )
        data.push(user);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};
//GET ALL
UserControllers.get = async (req,res,next)=>{
    const data = [];
    try {
        const users = await User.find();
        data.push(users);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

export default UserControllers;