import {PrismaClient} from "@prisma/client"
import JWT from "jsonwebtoken";
import "dotenv/config"
import { User } from "../types/user";
import { Doctor } from "../types/user";
import { Request,Response } from "express";
import validator from "validator"
import bcrypt from "bcrypt"


const prisma = new PrismaClient();
 
async function registerPatient(req:Request,res:Response ) {
    const {name,email,password}:User = req.body
    if(!name || !email || !password){
        return res.json({success:false,message : "All fields are required"})
    }
    try {
        
    } catch (error) {
        
    }
}
 
async function loginPatient({email,password}:User) {
    try {
        
    } catch (error) {
        
    }
}

async function registerAdmin() {
    try {
        
    } catch (error) {
        
    }
}
async function loginAdmin() {
    try {
        
    } catch (error) {
        
    }
}
async function registerDoctor({name,email,password}:User) {
    try {
        
    } catch (error) {
        
    }
}
async function loginDoctor({email,password}:User) {
    try {
        
    } catch (error) {
        
    }
}
async function registerDC() {
    try {
        
    } catch (error) {
        
    }
}
async function loginDC() {
    try {
        
    } catch (error) {
        
    }
}

export {loginDC,loginAdmin,loginDoctor,loginPatient,registerAdmin,registerDC,registerDoctor,registerPatient}