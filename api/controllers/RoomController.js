import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import response from "../utils/response.js"

let roomControllers = {}

roomControllers.create = async (req,res,next)=>{
    const data = [];
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms : saveRoom._id}});
        } catch (err) {
            next(err);
        }
        data.push(saveRoom);
        res.status(200).send(response.create(true,data,null));
    } catch (err){
        next(err);
    }
}

roomControllers.update = async (req,res,next)=>{
    const data = [];
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        data.push(updateRoom);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

roomControllers.delete = async (req,res,next)=>{
    const data = [];
    const hotelId = req.params.hotelid;
    try {
        const room = await Room.findById(
            req.params.id,
        )
        if(room == null) return res.status(200).send(response.create(false,data,"Room is invalid."));

        const hotel = await Hotel.findById(
            req.params.hotelid,
        )
        if(hotel == null) return res.status(200).send(response.create(false,data,"Hotel is invalid."));

        await Room.findByIdAndDelete(
            req.params.id
        )

        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms : req.params.id}});
        } catch (err) {
            next(err);
        }

        res.status(200).send(response.create(true,data,"Room has been deleted."));

    } catch (err) {
        next(err);
    }
};

roomControllers.getById = async(req,res,next)=>{
    const data = [];
    try {
        const room = await Room.findById(
            req.params.id,
        )
        data.push(room)
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

roomControllers.get = async (req,res,next)=>{
    const data = [];
    try {
        const rooms = await Room.find()
        data.push(rooms)
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

export default roomControllers;