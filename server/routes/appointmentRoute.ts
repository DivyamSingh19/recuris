import { addAppointmentDoctor,addAppointmentDiagnosticCenter,editAppointment,cancelAppointment, fetchDoctors, fetchDiagnosticCenters } from "../controllers/appointmentController";
import express, { NextFunction, Request,Response } from "express"

const appointmentRouter = express.Router()


appointmentRouter.post("/appointment-doc",async(req:Request,res:Response,next:NextFunction)=>{
    try {
      await addAppointmentDoctor(req,res)
    } catch (error) {
        next(error)
        console.log("API error")
    }
})

appointmentRouter.post("/appointment-dc",async(req:Request,res:Response,next:NextFunction)=>{
    try {
      await addAppointmentDiagnosticCenter(req,res)
    } catch (error) {
        next(error)
        console.log("API error")
    }
})
 
appointmentRouter.post("/editAppointment",async(req:Request,res:Response,next:NextFunction)=>{try {
   await editAppointment(req,res)
} catch (error) {
    next(error)
    console.log("API error")
}} )

appointmentRouter.post("/cancelAppointment",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await cancelAppointment(req,res)
    } catch (error) {
        next(error)
        console.log("API error")
    }
})

appointmentRouter.get("/fetchDoctors",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await fetchDoctors(req,res)
    } catch (error) {
        next(error)
        console.log("API error")
    }
})

appointmentRouter.get("/fetchDiagnostiCenters",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await fetchDiagnosticCenters(req,res)
    } catch (error) {
        next(error)
        console.log("API error")
    }
})


export default appointmentRouter;