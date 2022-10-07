import express from "express";
import HotelControllers from "../controllers/HotelController.js";
import AuthControllers from "../controllers/AuthController.js";
import UserControllers from "../controllers/UserController.js";
import Verify from "../utils/verify.js";
const router = express.Router();

//---------AUTH---------//
router.post("/auth/register",AuthControllers.register);
router.post("/auth/login",AuthControllers.login);
// router.get("/checkauthentication",Verify.token,(req,res,next)=>{

// })


//---------HOTEL---------//
//CREATE
router.post("/hotel/create", HotelControllers.create);
//UPDATE
router.put("/hotel/update/:id", HotelControllers.update);
//DELETE
router.delete("/hotel/delete/:id",HotelControllers.delete);
//GET
router.get("/hotel/get/:id", HotelControllers.getById);
router.get("/hotel/get", HotelControllers.get );


//---------ROOMS---------//
//CREATE

//UPDATE

//DELETE

//GET


//---------USERS---------//
//UPDATE
router.put("/user/update/:id",Verify.user, UserControllers.update);
//DELETE
router.delete("/user/delete/:id",Verify.user,UserControllers.delete);
//GET
router.get("/user/get/:id",Verify.user, UserControllers.getById);
router.get("/user/get", Verify.admin,UserControllers.get );

export default router;