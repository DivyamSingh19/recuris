import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
import appointmentRouter from "./routes/appointmentRoute";
import bookingRouter from "./routes/bookingRoute";
 
import dotenv from "dotenv"


const app = express();
const port =process.env.PORT || 5000


app.use(express.json())
app.use(cors())
dotenv.config()








//api
app.use("/api/user",userRouter)
app.use("/api/appointment",appointmentRouter)
app.use("/api/booking",bookingRouter)





//global catches

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });