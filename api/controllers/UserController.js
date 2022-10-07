import User from "../models/User.js";

let UserControllers = {}

UserControllers.update = async (req,res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
};
//DELETE
UserControllers.delete = async (req,res)=>{
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};
//GET
UserControllers.getById = async(req,res)=>{
    try {
        const user = await User.findById(
            req.params.id,
        )
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
//GET ALL
UserControllers.get = async (req,res,next)=>{
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export default UserControllers;