 
import { loginAdmin,loginDoctor,loginDC,loginPatient,registerAdmin,registerDC,registerDoctor,registerPatient } from "../controllers/userController";
import express, { Request,Response, NextFunction } from "express"
const userRouter =express.Router();

userRouter.post("/register-patient",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  registerPatient(req,res)
    } catch (error) {
       next(error)
    }
    

})

userRouter.post("/register-doctor",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  registerDoctor(req,res)
    } catch (error) {
       next(error)
    }
    } )

userRouter.post("/register-dc",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  registerDC(req,res)
    } catch (error) {
       next(error)
    }
    }  )

userRouter.post("/register-admin",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  registerAdmin(req,res)
    } catch (error) {
       next(error)
    }
    }  )

userRouter.post("/login-patient",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  loginPatient(req,res)
    } catch (error) {
       next(error)
    }
    } )

userRouter.post("/login-doctor",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  loginDoctor(req,res)
    } catch (error) {
       next(error)
    }
    }  )

userRouter.post("/login-dc",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  loginDC(req,res)
    } catch (error) {
       next(error)
    }
    }   )

userRouter.post("/login-admin",async (req:Request,res:Response,next:NextFunction)=>{
    try {
        await  loginAdmin(req,res)
    } catch (error) {
       next(error)
    }
    }   )


export default userRouter;