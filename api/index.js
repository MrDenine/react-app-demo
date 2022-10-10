import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiv1 from "./routes/api.v1.js"
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.log("Connection Error:" + error);
        throw error;
    }
};

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected.");
});

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected.");
});

//middlewares
app.use(cors({
    'allowedHeaders': ["sessionId", 'Content-Type'],
    "exposedHeaders": ["sessionId"],
    "origin": '*',
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false
    }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/",apiv1);
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    console.log(err.stack);
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        // stack:err.stack
    });
})

app.listen(8800,()=>{
    connect();
    console.log("Connected to backend.");
})
