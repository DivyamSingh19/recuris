 
import { loginAdmin,loginDoctor,loginDC,loginPatient,registerAdmin,registerDC,registerDoctor,registerPatient } from "../controllers/userController";
import express from "express"
const userRouter =express.Router();

userRouter.post("/register-patient",registerPatient)

userRouter.post("/register-doctor",registerDoctor)

userRouter.post("/register-dc",registerDC)

userRouter.post("/register-admin",registerAdmin)

userRouter.post("/login-patient",loginPatient)

userRouter.post("/login-doctor",loginDoctor)

userRouter.post("/login-dc",loginDC)

userRouter.post("/login-admin",loginAdmin)


export default userRouter;