import express from "express"
import {Request,Response,NextFunction} from "express"
import {Router} from "express"
import { totalPatientDC, totalPatientDoc } from "../controllers/totalPatientsController";

const totalPatientRouter = express.Router();

totalPatientRouter.get("/total-patientDc",async (req:Request,res:Response,next:NextFunction) => {
    try {
        totalPatientDC(req,res)
    } catch (error) {
        next(error)
    }
})

totalPatientRouter.get("/total-patientDoctor",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        totalPatientDoc(req,res)
    } catch (error) {
        next(error)
    }
})

export default totalPatientRouter