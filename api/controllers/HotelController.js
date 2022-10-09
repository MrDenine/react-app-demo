import Hotel from "../models/Hotel.js";
import response from "../utils/response.js"

let hotelControllers = {}

hotelControllers.create = async (req,res,next) => {
    const data = [];
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        data.push(newHotel);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
}

hotelControllers.update = async (req,res,next)=>{
    const data = [];
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
        )
        data.push(updateHotel);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.delete = async (req,res,next)=>{
    const data = [];
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        
        res.status(200).send(response.create(true,data,"Hetel has been deleted."));
    } catch (err) {
        next(err);
    }
};

hotelControllers.getById = async(req,res,next)=>{
    const data = [];
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        data.push(hotel);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.get = async (req,res,next)=>{
    try {
        const hotels = await Hotel.find()
        res.status(200).send(response.create(true,hotels,null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",");
    const data = [];
    try {
        
        const count = await Promise.all(cities.map((city)=>{
          return Hotel.countDocuments({city:city})
        }));

        cities.forEach((value, i) => {
            data.push({"city":value,"count":count[i]});
        });

        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

hotelControllers.countByType = async (req,res,next)=>{
    const data = [];
    try {
        const hotels = await Hotel.find()
        data.push(hotels);
        res.status(200).send(response.create(true,data,null));
    } catch (err) {
        next(err);
    }
};

export default hotelControllers;