import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
// import appointmentRouter from "./routes/appointmentRoute";
import bookingRouter from "./routes/bookingRoute";
import pinRouter from "./routes/pinRoute";
 
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary";


const app = express();
const port =process.env.PORT || 5000


app.use(express.json())
app.use(cors())
dotenv.config()

connectCloudinary()






//api
app.use("/api/user",userRouter)
// app.use("/api/appointment",appointmentRouter)
// app.use("/api/booking",bookingRouter)
app.use("/api/pin",pinRouter)





//global catches

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });