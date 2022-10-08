import User from "../models/User.js";
import response from "../utils/response.js"

let UserControllers = {}

UserControllers.update = async (req,res,next)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        res.status(200).send(response.create(true,[updateUser],null));
    } catch (err) {
        next(err);
    }
};
//DELETE
UserControllers.delete = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).send(response.create(true,[],"User has been deleted."));
        
    } catch (err) {
        next(err);
    }
};
//GET
UserControllers.getById = async(req,res,next)=>{
    try {
        const user = await User.findById(
            req.params.id,
        )
        res.status(200).send(response.create(true,[user],null));
    } catch (err) {
        next(err);
    }
};
//GET ALL
UserControllers.get = async (req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).send(response.create(true,[users],null));
    } catch (err) {
        next(err);
    }
};

export default UserControllers;