import { createBooking,editBooking } from "../controllers/bookingController";
import express from "express"


const bookingRouter = express.Router()


bookingRouter.post("/createBooking",createBooking)
bookingRouter.post("/editBooking",editBooking)


export default bookingRouter