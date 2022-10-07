import Hotel from "../models/Hotel.js";

let hotelControllers = {}

hotelControllers.create = async (req,res,next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

hotelControllers.update = async (req,res)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
};
//DELETE
hotelControllers.delete = async (req,res)=>{
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hetel has been deleted.");
    } catch (err) {
        next(err);
    }
};
//GET
hotelControllers.getById = async(req,res)=>{
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};
//GET ALL
hotelControllers.get = async (req,res,next)=>{
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};

export default hotelControllers;