import { addAppointment,editAppointment,cancelAppointment } from "../controllers/appointmentController";
import express from "express"

const appointmentRouter = express.Router()


appointmentRouter.post("/addAppointment",addAppointment)
appointmentRouter.post("/editAppointment",editAppointment)
appointmentRouter.post("/cancelAppointment",cancelAppointment)


export default appointmentRouter;