import {PrismaClient} from "@prisma/client"
import JWT from "jsonwebtoken"
import "dotenv/config"
import { Admin, DiagnosticCenter, Patient } from "../types/user";
import { Doctor } from "../types/user";
import { Request,Response } from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import { createToken } from "../utils/token";

const prisma = new PrismaClient();

 
 
async function registerPatient(req:Request,res:Response ) {
    try {
    const {name,email,password,walletAddress} = req.body as Patient
    const exists = await prisma.patient.findUnique({where:{email}})
    if(exists){
        return res.json({success : false,message : "User already exists"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message : "Password length is too short"})
    }
    if(!name || !email || !password || !walletAddress){
        return res.json({success:false,message : "All fields are required"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const newPatient = await prisma.patient.create({
        data :{
            name ,
            email,
            password :hashedPassword,
            walletAddress

        }
     })
  

     const token = createToken(newPatient.id)
     const role :string = "patient";
     const metaData = {
        name,
        email,
        walletAddress
     }
     res.json({success:true,token,metaData,role})
        
    } catch (error ) {
        console.log(error);
        res.json({success:false,message:(error as Error).message})
    }
}
 
async function loginPatient(req:Request,res:Response) {
    try {
        const {email,password,walletAddress} = req.body as Patient
        const patient = await prisma.patient.findUnique({where:{email},select:{id:true,password:true ,name:true,walletAddress:true}});

        if(!patient){
            return res.json({success:false,message:"Patient not registered"})
        }
        const isMatch = await bcrypt.compare(password,patient.password);
        if(isMatch){
            const token = createToken(patient.id)
            const metaData={
                name:patient.name,
                email,
                walletAddress:patient.walletAddress
            }
            res.json({success:true,token,metaData})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:(error as Error).message})
    }
}

async function registerAdmin(req:Request,res:Response) {
    try {
      const {name,email,password,hospital,h_id} = req.body as Admin
      const exits = await prisma.doctor.findUnique({where:{email}})
      if(exits){
        return res.json({success:false,message:"Admin already exits"})
      }
      if(!validator.isEmail(email)){
        return res.json({success:false,message:"Invalid email"})
      }
      if(password.length<8){
        return res.json({success:false,message:"Password too short"})
      }
      if(!name || !email || !password || !hospital || !h_id){
        return res.json({success : false, message : "All fields are required"})

    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newAdmin = await prisma.hospital_Admin.create({
        data:{
            name,
            email,
            password:hashedPassword,
            hospital,
            h_id
        }
    })
    const token = createToken(newAdmin.id)
    const role :string = "Admin";
     const metaData = {
        name,
        email
     }
    return res.json({success:true , token,metaData,role})
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:(error as Error).message})
        
    }
}
async function loginAdmin(req:Request,res:Response) {
    try {
        const {email,password} = req.body as Admin
         
        const admin = await prisma.hospital_Admin.findUnique({where:{email},select:{id:true,password:true ,name:true}})
        if(!admin){
            return res.json({success:false,message:"Admin not registered"})
        }
        const isMatch = await bcrypt.compare(password,admin.password)
        if(isMatch){
            const token = createToken(admin.id)
            const metaData={
                name:admin.name,
                email
            }
             res.json({success:true,token,metaData})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:(error as Error).message})
    }
}
async function registerDoctor(req:Request,res:Response) {
    try {
        const {name,email,password,hospital,h_id,walletAddress}  = req.body as Doctor
        const exists = await prisma.doctor.findUnique({where:{email}})
        if(exists){
            return res.json({success:false,message:"User already exits"})
        }
        if(!name || !email || !password || !hospital || !h_id||!walletAddress) {
            return res.json({success : false, message : "All fields are required"})

        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message :"Password length is too short"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newDoctor = await prisma.doctor.create({
            data:{
                name,
                email,
                password : hashedPassword,
                hospital,
                h_id,
                walletAddress
            }
        })

        const token = createToken(newDoctor.id)
        const role :string = "doctor";
        const metaData = {
          name,
          email,
          walletAddress
     }
        return res.json({success:true , token,metaData,role})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message : (error as Error).message})
    }
}
async function loginDoctor(req:Request,res:Response) {
    try {
        const {email,password} = req.body as Doctor
         
        const doctor = await prisma.doctor.findUnique({where:{email},select:{id:true,password:true ,name:true,walletAddress:true}})
        if(!doctor){
            return res.json({success:false,message:"Doctor not registered"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = createToken(doctor.id)
            const metaData={
                name:doctor.name,
                email,
                walletAddress:doctor.walletAddress
            
            }
            res.json({success:true,token,metaData})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:(error as Error).message})
    }
}
async function registerDC(req:Request,res:Response) {
    try {
        const {name,email,password,specialization,phoneNumber,location,walletAddress} = req.body as DiagnosticCenter
        const exists = await prisma.diagnosticCenter.findUnique({where:{email,phoneNumber}})
        if(!name ||!email||!specialization||!password||!phoneNumber||!location ||!walletAddress){
            return res.json({success:false,message:"All fields are mandatory"})
        }
        if(exists){
            return res.json({success:false,message:"Center already registered"})
        }
        if(phoneNumber.length !=10){
            return res.json({success:false,message:"Enter a valid Phone Number"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Password too short"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newDiagCenter = await prisma.diagnosticCenter.create({
            data:{
                name,
                email,
                password:hashedPassword,
                phoneNumber,
                specialization,
                location,
                walletAddress
            }
        })
        const token = createToken(newDiagCenter.id)
        const role :string = "diagnostic_center";
        const metaData = {
        name,
        email,
        walletAddress
     }
        return res.json({success:true,token,metaData,role})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:((error as Error).message)})
    }
}
async function loginDC(req:Request,res:Response) {
    try {
        const {email,password} = req.body as DiagnosticCenter
        const diagnosticCenter = await prisma.diagnosticCenter.findUnique({where:{email},select:{id:true,password:true ,name:true}})
        if(!diagnosticCenter){
            return res.json({success:false,message:"Diagnostic Center not registered"})
        }
        const isMatch = await bcrypt.compare(password,diagnosticCenter.password)
        if(isMatch){
            const token = createToken(diagnosticCenter.id)
            const metaData={
                name:diagnosticCenter.name,
                email
            }
            res.json({success:true,token,metaData})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:(error as Error).message})
    }
}

export {loginDC,loginAdmin,loginDoctor,loginPatient,registerAdmin,registerDC,registerDoctor,registerPatient}