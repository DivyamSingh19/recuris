import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
import {v2 as cloudinary} from "cloudinary";

async function getUserForSidebar(req:Request,res:Response) {
    try {
       
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:(error as Error).message})
    }
}
async function getMessages(req:Request,res:Response) {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:(error as Error).message
        })
    }
}

async function sendMessage(req:Request,res:Response) {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:(error as Error).message})
    }
}





export {getUserForSidebar,getMessages}