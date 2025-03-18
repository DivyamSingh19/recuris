import express, { NextFunction } from "express"
import { createPin,changePin } from "../controllers/pinController";
import { Request,Response } from "express";
const pinRouter =express.Router();

pinRouter.post("/create",async(req:Request,res:Response,next:NextFunction) => {
    try {
        createPin(req,res)
    } catch (error) {
        next(error)
    }
});
pinRouter.post("/change-pin",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        changePin(req,res)
    } catch (error) {
        next(error)
    }
     })


export default pinRouter