import {PrismaClient} from "@prisma/client"
import { Jwt } from "jsonwebtoken";
const prisma = new PrismaClient();

interface User{
    name: string,
    email:string,
    password: string
}

interface Doctor{ 
    hospital : string,
    specialization :string
}
async function registerPatient({name,email,password}:User ) {
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
async function registerDoctor({name,email,password}:User,{hospital,specialization}:Doctor) {
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