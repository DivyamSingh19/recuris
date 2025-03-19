import { PrismaClient } from "@prisma/client";
import { createToken } from "../utils/token";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request{
    user?:{
        id:number;
        role:"Patient" | "Doctor" | "DiagnosticCenter"
    };
}

async function createPin(req:AuthenticatedRequest,res:Response) {
    try {
        const {patientId , doctorId , diagnosticCenterId} = req.body
         if(!req.user){
            return res.status(401).json({
                success: false,
                message:"Authentication required"
            })
         }
         const userRole = req.user.role
         const userId = req.user.id;
         let userVerified = false
         if(userRole === "Patient"){
            const patient = await prisma.patient.findUnique({where:{id:userId}})
            userVerified = !!patient
            if(!userVerified ||userId!==patientId){
                return res.status(403).json({
                    success:false,
                    message:"Wrong id"
                })
            }
         }
         else if(userRole === "Doctor"){
            const doctor = await prisma.doctor.findUnique({where:{id:userId}});
            userVerified = !!doctor
            if(!userVerified||userId!==doctorId){
                return res.status(403).json({
                    success:false,
                    message:"Wrong Id"
                })
            }
         }
         else if (userRole === "DiagnosticCenter"){
            const diagnosticCenter = await prisma.diagnosticCenter.findUnique({where:{id:userId}})
            userVerified = !!diagnosticCenter
            if(!userVerified || userId!==diagnosticCenterId){
                return res.status(403).json({
                    success:false,
                    message:"Wrong Id"
                })
            }
         }
        if(!patientId||!doctorId||!diagnosticCenterId){
            return res.status(400).json({
                success:false,
                message : "Missing required fields : patientId,doctorId or diagnosticCenterId"

            })
        }
        if(userRole !== "Patient"){
            const patient = await prisma.patient.findUnique({where:{id:patientId}})
            if(!patient){
                return res.status(404).json({
                    success:false,
                    message : "Patient not found"
                })
            }
        }
        if(userRole !== "Doctor"){
            const doctor = await prisma.doctor.findUnique({where:{id:doctorId}})
            if(!doctor){
                return res.status(404).json({
                    success:false,
                    message : "Doctor not found"
                })
            }
        }
        if(userRole !== "DiagnosticCenter"){
            const diagnosticCenter = await prisma.diagnosticCenter.findUnique({where:{id:diagnosticCenterId}})
            if(!diagnosticCenter){
                return res.status(404).json({
                    success:false,
                    message : "DiagnosticCenter not found"
                })
            }
        }
        const existingPin = await prisma.pin.findFirst({
            where:{
                OR:[
                    {patientId},
                    {doctorId},
                    {diagnosticCenterId}


                ]
            }
        })
        if(existingPin){
            return res.status(409).json({
                success:false,
                message:"A pin already exists for your account"
            })
        }
        const newPin = await prisma.pin.create({
            data:{
                patientId,
                doctorId,
                diagnosticCenterId
            }
        })
        const salt = await bcrypt.genSalt(10);
        // const hashedPin = await bcrypt.hash(newPin,salt)
        
        const token = createToken({
            pinId : newPin.id,
            role: userRole,
            userId
        })
        return res.json({
            success:true,
            message:"PIN created successfully",
            data:{
                pin:newPin,
                token
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create pin",
            error : (error as Error).message
        })
    }
}
async function changePin(req:AuthenticatedRequest,res:Response) {
    try {
        const {id} = req.params
        const {patientId,doctorId,diagnosticCenterId} = req.body;
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Authentication required"
            })
        }
        const userRole = req.user.role;
        const userId = req.user.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message :"Pin Id is required"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to change pin",
            error : (error as Error).message
        })
    }
}

export {createPin,changePin}