import { PrismaClient } from "@prisma/client";
import { DiagnosticCenter } from "../types/user";
import {v2 as cloudinary} from "cloudinary"
import { Request,Response } from "express";
 
import {Patient} from "../types/user"

 
const prisma = new PrismaClient()
async function patientProfile(req:Request,res:Response){
    try {
        try {
                const { profileImage, patientId, location, age, phoneNumber, gender } = req.body;
                
                 
                const patientExists = await prisma.patient.findUnique({
                  where: { id: Number(patientId) }
                });
                
                if (!patientExists) {
                  return res.status(404).json({ message: 'Patient not found' });
                }
                
                // Check if profile already exists for this patient
                const existingProfile = await prisma.patientProfile.findUnique({
                  where: { patientId: Number(patientId) }
                });
                
                if (existingProfile) {
                  return res.status(400).json({ message: 'Profile already exists for this patient' });
                }
                
                const newProfile = await prisma.patientProfile.create({
                  data: {
                    profileImage,
                    patientId: Number(patientId),
                    location,
                    age,
                    phoneNumber,
                    gender
                  }
                });

                
       
          res.status(201).json(newProfile);
    } catch (error) {
        console.log(error)
        res.json({success:false,message:(error as Error).message})
    }
}

// async function doctorProfile(req:Request,res:Response) {
//     try {
        
//     } catch (error) {
        
//     }
// }
// async function adminProfile(req:Request,res:Response) {
//     try {
        
//     } catch (error) {
        
//     }
// }
// async function dcProfile(req:Request,res:Response) {
//     try {
//         const {email,name} = req.body as DiagnosticCenter
        
//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message:(error as Error).message })
//     }
// }
// async function getPatientProfiles(req:Request,res:Response) {
    
//     const 
//     try {
//         const profiles = await prisma.patientProfile.findMany({
//             include:{
//                 patient:{
//                     select:{
//                         name,
//                         location
//                     }
//                 }
//             }
//         })
//        return res.json(profiles)
//     } catch (error) {
//        return res.json({success:false,message:(error as Error).message})
//     }
// }


// export {patientProfile,doctorProfile,adminProfile,dcProfile}

 
// exports.getAllProfiles = async (req, res) => {
//   try {
//     const profiles = await prisma.patientProfile.findMany({
//       include: {
//         patient: true
//       }
//     });
//     res.status(200).json(profiles);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving patient profiles', error: error.message });
//   }
// };

// // Get profile by ID
// exports.getProfileById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const profile = await prisma.patientProfile.findUnique({
//       where: { id: Number(id) },
//       include: {
//         patient: true
//       }
//     });
    
//     if (!profile) {
//       return res.status(404).json({ message: 'Patient profile not found' });
//     }
    
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving patient profile', error: error.message });
//   }
// };

// // Get profile by patient ID
// exports.getProfileByPatientId = async (req, res) => {
//   try {
//     const { patientId } = req.params;
    
//     const profile = await prisma.patientProfile.findUnique({
//       where: { patientId: Number(patientId) },
//       include: {
//         patient: true
//       }
//     });
    
//     if (!profile) {
//       return res.status(404).json({ message: 'Patient profile not found' });
//     }
    
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving patient profile', error: error.message });
//   }
// };

// // Create a new profile
// exports.createProfile = async (req, res) => {
//   try {
//     const { profileImage, patientId, location, age, phoneNumber, gender } = req.body;
    
//     // Check if patient exists
//     const patientExists = await prisma.patient.findUnique({
//       where: { id: Number(patientId) }
//     });
    
//     if (!patientExists) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
    
//     // Check if profile already exists for this patient
//     const existingProfile = await prisma.patientProfile.findUnique({
//       where: { patientId: Number(patientId) }
//     });
    
//     if (existingProfile) {
//       return res.status(400).json({ message: 'Profile already exists for this patient' });
//     }
    
//     const newProfile = await prisma.patientProfile.create({
//       data: {
//         profileImage,
//         patientId: Number(patientId),
//         location,
//         age,
//         phoneNumber,
//         gender
//       }
//     });
    
//     res.status(201).json(newProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating patient profile', error: error.message });
//   }
// };

// // Update profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { profileImage, location, age, phoneNumber, gender } = req.body;
    
//     // Check if profile exists
//     const profileExists = await prisma.patientProfile.findUnique({
//       where: { id: Number(id) }
//     });
    
//     if (!profileExists) {
//       return res.status(404).json({ message: 'Patient profile not found' });
//     }
    
//     const updatedProfile = await prisma.patientProfile.update({
//       where: { id: Number(id) },
//       data: {
//         profileImage,
//         location,
//         age,
//         phoneNumber,
//         gender
//       }
//     });
    
//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating patient profile', error: error.message });
//   }
// };

