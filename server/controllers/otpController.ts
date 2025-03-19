import nodemailer from "nodemailer"
import twilio from "twilio"
import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"


const OTP_STORAGE = new Map();


const client = twilio()



async function sendOtp(req:Request,res:Response) {
    try {
        
    } catch (error) {
        console.log(error)
       
    }
}

async function verifyOtp (req:Request,res:Response){
    try {
        
    } catch (error) {
        
    }
}