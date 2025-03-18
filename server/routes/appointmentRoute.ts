// import { addAppointment,editAppointment,cancelAppointment } from "../controllers/appointmentController";
// import express, { NextFunction, Request,Response } from "express"

// const appointmentRouter = express.Router()


// appointmentRouter.post("/addAppointment",async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//       await addAppointment(req,res)
//     } catch (error) {
//         next(error)
//     }
// })
// appointmentRouter.post("/editAppointment",async(req:Request,res:Response,next:NextFunction)=>{try {
//    await editAppointment(req,res)
// } catch (error) {
//     next(error)
// }} )
// appointmentRouter.post("/cancelAppointment",async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//         await cancelAppointment(req,res)
//     } catch (error) {
//         next(error)
//     }
// })


// export default appointmentRouter;