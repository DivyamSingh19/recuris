import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
import appointmentRouter from "./routes/appointmentRoute";
import bookingRouter from "./routes/bookingRoute";
import 'dotenv/config'


const app = express();
const port = 4000
const dotenv = require('dotenv')

app.use(express.json())
app.use(cors())
app.use(dotenv())








//api
app.use("/api/user",userRouter)
app.use("/api/appointment",appointmentRouter)
app.use("/api/booking",bookingRouter)





//global catches

app.listen("Server started on :"+port)