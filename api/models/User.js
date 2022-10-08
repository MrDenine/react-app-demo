import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select: false
    },
    isAdmin:{
        type:Boolean,
        default:false,
        select: false
    },
},
{
    timestamps:true
});

export default mongoose.model("User",UserSchema);