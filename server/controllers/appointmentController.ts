import { PrismaClient } from "@prisma/client";
import { Patient } from "../types/user";
import { Request,Response } from "express";
import { appointment } from "../types/functions";
const prisma = new PrismaClient();

 
async function addAppointmentDoctor(req:Request,res:Response) {
    try {
        const {patientId,doctorId,date,email,name} = req.body as appointment
        const existingAppointment = await prisma.appointments.findUnique({
            where: { patientId },
        });

        if (existingAppointment) {
            return res.status(400).json({ message: "Patient already has an appointment" });
        }

        
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId },
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const appointment = await prisma.appointments.create({
            data: { patientId, 
                    doctorId, 
                    date :new Date(),
                    createdAt: new Date(), 
                    updatedAt: new Date() },
        });

        return res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function editAppointment(req:Request,res:Response) {
    try {
        const { appointmentId, date, time } = req.body;

        const updatedAppointment = await prisma.appointments.update({
            where: { id: appointmentId },
            data: { updatedAt: new Date() },
        });

        return res.status(200).json({ message: "Appointment updated successfully", updatedAppointment });
    } catch (error) {
        console.error("Error updating appointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function cancelAppointment(req:Request,res:Response) {
    try {
        const { appointmentId } = req.body;

        await prisma.appointments.delete({
            where: { id: appointmentId },
        });

        return res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function addAppointmentDiagnosticCenter(req:Request,res:Response) {
    try {
        const { patientId, diagnosticCenterId, date, createdAt } = req.body as appointment;

        
        const diagnosticCenter = await prisma.diagnosticCenter.findUnique({
            where: { id: diagnosticCenterId },
        });

        if (!diagnosticCenter) {
            return res.status(404).json({ message: "Diagnostic center not found" });
        }

         
        const appointment = await prisma.appointments.create({
            data: {
                patientId,
                diagnosticCenterId,
                date,
                createdAt,
            },
        });

        return res.status(201).json({ message: "Diagnostic appointment booked successfully", appointment });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message : (error as Error).message
        })
    }
}
async function viewAppointments(req:Request,res:Response) {
    try {
        const { userId, role } = req.params;
        let appointments;

        if (role === "patient") {
            appointments = await prisma.appointments.findUnique({
                where: { patientId: parseInt(userId) },
                include: { doctor: true },
            });
        } else if (role === "doctor") {
            appointments = await prisma.appointments.findMany({
                where: { doctorId: parseInt(userId) },
                include: { patient: true },
            });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function fetchDoctors(req:Request,res:Response){
    try {
        const doctors = await prisma.doctor.findMany();
        return res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function fetchDiagnosticCenters(req:Request,res:Response){
    try {
        const diagnosticCenters = await prisma.diagnosticCenter.findMany();
        return res.status(200).json(diagnosticCenters);
    } catch (error) {
        console.error("Error fetching diagnostic centers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {addAppointmentDoctor,editAppointment,cancelAppointment,viewAppointments,addAppointmentDiagnosticCenter, fetchDoctors, fetchDiagnosticCenters}