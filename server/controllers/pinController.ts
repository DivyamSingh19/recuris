import { PrismaClient } from "@prisma/client";
import { createToken } from "../utils/token";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: "patient" | "doctor" | "diagnostic_center"
    };
}

const algorithm = "aes-256-cbc";
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
};

const decrypt = (text: string) => {
    // Implementation needed
};

async function createPin(req: AuthenticatedRequest, res: Response) {
    try {
        const { patientId, doctorId, diagnosticCenterId } = req.body;
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }
        const userRole = req.user.role;
        const userId = req.user.id;
        let userVerified = false;
        if (userRole === "patient") {
            const patient = await prisma.patient.findUnique({ where: { id: userId } });
            userVerified = !!patient;
            if (!userVerified || userId !== patientId) {
                return res.status(403).json({
                    success: false,
                    message: "Wrong id"
                });
            }
        }
        else if (userRole === "doctor") {
            const doctor = await prisma.doctor.findUnique({ where: { id: userId } });
            userVerified = !!doctor;
            if (!userVerified || userId !== doctorId) {
                return res.status(403).json({
                    success: false,
                    message: "Wrong Id"
                });
            }
        }
        else if (userRole === "diagnostic_center") {
            const diagnosticCenter = await prisma.diagnosticCenter.findUnique({ where: { id: userId } });
            userVerified = !!diagnosticCenter;
            if (!userVerified || userId !== diagnosticCenterId) {
                return res.status(403).json({
                    success: false,
                    message: "Wrong Id"
                });
            }
        }
        if (!patientId || !doctorId || !diagnosticCenterId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields : patientId,doctorId or diagnosticCenterId"
            });
        }
        if (userRole !== "patient") {
            const patient = await prisma.patient.findUnique({ where: { id: patientId } });
            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient not found"
                });
            }
        }
        if (userRole !== "doctor") {
            const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
            if (!doctor) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                });
            }
        }
        if (userRole !== "diagnostic_center") {
            const diagnosticCenter = await prisma.diagnosticCenter.findUnique({ where: { id: diagnosticCenterId } });
            if (!diagnosticCenter) {
                return res.status(404).json({
                    success: false,
                    message: "DiagnosticCenter not found"
                });
            }
        }
        const existingPin = await prisma.pin.findFirst({
            where: {
                OR: [
                    { patientId },
                    { doctorId },
                    { diagnosticCenterId }
                ]
            }
        });
        if (existingPin) {
            return res.status(409).json({
                success: false,
                message: "A pin already exists for your account"
            });
        }
        
        // Generate a random PIN (6 digits)
        const pinValue = Math.floor(100000 + Math.random() * 900000).toString();
        
        const salt = await bcrypt.genSalt(10);
        const hashedPin = await bcrypt.hash(pinValue, salt);
        
        
        const newPin = await prisma.pin.create({
            data: {
                patientId,
                doctorId,
                diagnosticCenterId,
                
            }
        });
        
        
        
        const token = createToken(newPin.id);
        
        return res.json({
            success: true,
            message: "PIN created successfully",
            data: {
                pin: newPin,
                pinValue,  
                token
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create pin",
            error: (error as Error).message
        });
    }
}

async function changePin(req: AuthenticatedRequest, res: Response) {
    try {
        const { id } = req.params;
        const { patientId, doctorId, diagnosticCenterId } = req.body;
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }
        const userRole = req.user.role;
        const userId = req.user.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Pin Id is required"
            });
        }
        
      
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to change pin",
            error: (error as Error).message
        });
    }
}

export { createPin, changePin };