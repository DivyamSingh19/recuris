import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
 
const prisma = new PrismaClient

const totalPatientDoc = async (req:Request,res:Response) => {
    try {
        const { doctorId } = req.params;

       
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(doctorId) },
            include: { patients: true },
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const totalPatients = doctor.patients.length;

        return res.status(200).json({ totalPatients });
    } catch (error) {
        console.error("Error fetching total patients for doctor:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const totalPatientDC = async (req:Request,res:Response) =>{
    try {
        const {diagnosticCenterId} = req.params;
        const diagnosticCenter = await prisma.diagnosticCenter.findUnique({
            where:{id:parseInt(diagnosticCenterId)},
            include:{patients:true}
        })
        if(!diagnosticCenter){
            return res.status(404).json({message:"Diagnostic Center not found"});
        }
        const totalPatients = diagnosticCenter.patients.length;
        return res.status(200).json({totalPatients})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:(error as Error).message})
    }
}
export  {totalPatientDoc,totalPatientDC}