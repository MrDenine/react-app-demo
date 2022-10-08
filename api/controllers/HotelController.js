import Hotel from "../models/Hotel.js";
import response from "../utils/response.js"

let hotelControllers = {}

hotelControllers.create = async (req,res,next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).send(response.create(true,[savedHotel],null));
    } catch (err) {
        next(err);
    }
}

hotelControllers.update = async (req,res,next)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        res.status(200).send(response.create(true,[updateHotel],null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.delete = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).send(response.create(true,[],"Hetel has been deleted."));
    } catch (err) {
        next(err);
    }
};

hotelControllers.getById = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        res.status(200).send(response.create(true,[hotel],null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.get = async (req,res,next)=>{
    try {
        const hotels = await Hotel.find()
        res.status(200).send(response.create(true,[hotels],null));
    } catch (err) {
        next(err);
    }
};

export default hotelControllers;