import express from "express";
import HotelControllers from "../controllers/HotelController.js";
import AuthControllers from "../controllers/AuthController.js";
import UserControllers from "../controllers/UserController.js";
import roomControllers from "../controllers/RoomController.js";
import Verify from "../utils/verify.js";
const router = express.Router();

//---------AUTH---------//
router.post("/auth/register",AuthControllers.register);
router.post("/auth/login",AuthControllers.login);

//---------VERIFY---------//
router.get("/verify/checkauthentication",Verify.token,(req,res,next)=>{
    res.send("Welcome user, you are logged in.")
})
router.get("/verify/checkuser/:id",Verify.user,(req,res,next)=>{
    res.send("Welcome user, you have been authurized to user.")
})
router.get("/verify/checkauthentication",Verify.admin,(req,res,next)=>{
    res.send("Welcome admin, you have been authurized to admin.")
})

//---------HOTEL---------//
//CREATE
router.post("/hotel/create",Verify.admin, HotelControllers.create);
//UPDATE
router.put("/hotel/update/:id",Verify.admin,HotelControllers.update);
//DELETE
router.delete("/hotel/delete/:id",Verify.admin,HotelControllers.delete);
//GET
router.get("/hotel/get/:id", HotelControllers.getById);
router.get("/hotel/get", HotelControllers.get );
router.get("/hotel/countbycity", HotelControllers.countByCity );
router.get("/hotel/countbytype", HotelControllers.get );

//---------ROOMS---------//
//CREATE
router.post("/room/create/:hotelid",Verify.admin, roomControllers.create);
//UPDATE
router.put("/room/update/:id",Verify.admin,roomControllers.update);
//DELETE
router.delete("/room/delete/:id/:hotelid",Verify.admin,roomControllers.delete);
//GET
router.get("/room/get/:id", roomControllers.getById);
router.get("/room/get", roomControllers.get );

//---------USERS---------//
//UPDATE
router.put("/user/update/:id",Verify.user, UserControllers.update);
//DELETE
router.delete("/user/delete/:id",Verify.user,UserControllers.delete);
//GET
router.get("/user/get/:id",Verify.user, UserControllers.getById);
router.get("/user/get", Verify.admin,UserControllers.get );

export default router;