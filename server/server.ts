import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
import appointmentRouter from "./routes/appointmentRoute";
import insuranceRouter from "./routes/contractRoutes/insuranceProviderRoutes";
import pinRouter from "./routes/pinRoute";
import { NextFunction,Request,Response } from "express";
import { setupSocketIO } from "./utils/socket";
import http from "http"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary";
import totalPatientRouter from "./routes/totalPatients";
import patientRoutes from "./routes/contractRoutes/patientRoute"
import doctorRouter from "./routes/contractRoutes/doctorRoute";
import diagnosticRouter from "./routes/contractRoutes/diagnosticRoute";
const app = express();
const port =process.env.PORT || 5000
const server :http.Server=http.createServer(app)

app.use(express.json())
app.use(cors())
dotenv.config()

connectCloudinary()




const {io,getReceiverSocketId,getCurrentPartner} = setupSocketIO(app,server);
export {io,getReceiverSocketId,getCurrentPartner,app,server}
 

 
//api
app.use("/api/user",userRouter)
app.use("/api/appointment",appointmentRouter)
 
app.use("/api/pin",pinRouter)
app.use("/api/total-patients",totalPatientRouter)


app.use('/api/patient', patientRoutes);
app.use('/api/doctor',doctorRouter);
app.use('/api/diagnostic-control',diagnosticRouter);

app.use('/api/insurance',insuranceRouter)

//global catches
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); 
  res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });