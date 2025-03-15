import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
import appointmentRouter from "./routes/appointmentRoute";
import bookingRouter from "./routes/bookingRoute";



const app = express();
const port = 4000


app.use(express.json())
app.use(cors())









//api
app.use("/api/user",userRouter)
app.use("/api/appointment",appointmentRouter)
app.use("/api/booking",bookingRouter)





//global catches

app.listen("Server started on :"+port)