// import express, { Request, Response, NextFunction } from 'express';
// import { ethers, Contract, Wallet, providers } from 'ethers';
// import dotenv from 'dotenv';
// import fs from 'fs';

 
// dotenv.config();

 
// interface HealthRecord {
//     recordHash: string;
//     timestamp: string;
//     doctorAddress: string;
//     isActive: boolean;
// }

// interface Prescription {
//     medication: string;
//     dosage: string;
//     frequency: string;
//     startDate: string;
//     endDate: string;
//     doctorAddress: string;
//     isActive: boolean;
// }

// interface CreatePrescriptionBody {
//     patientAddress: string;
//     medication: string;
//     dosage: string;
//     frequency: string;
//     durationDays: number;
//     doctorPrivateKey: string;
// }

// const createContractInstance = (
//     rpcUrl: string, 
//     contractAddress: string, 
//     abiPath: string
// ): Contract => {
//     const abiContent = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
//     const contractABI = abiContent.abi || abiContent;

//     const provider = new providers.JsonRpcProvider(rpcUrl);
    
   
//     return new ethers.Contract(contractAddress, contractABI, provider);
// };

// const validateEthereumAddress = (
//     req: Request, 
//     res: Response, 
//     next: NextFunction
// ) => {
//     const addressRegex = /^0x[a-fA-F0-9]{40}$/;
//     const address = 
//         req.params.address || 
//         req.body.address || 
//         req.body.patientAddress ||
//         req.body.doctorAddress;
    
//     if (!address || !addressRegex.test(address)) {
//         return res.status(400).json({ error: 'Invalid Ethereum address' });
//     }
//     next();
// };

// class DoctorManagementController {
//     private contract: Contract;
//     private provider: providers.Provider;

//     constructor(contract: Contract) {
//         this.contract = contract;
//         // Ensure the provider is correctly assigned
//         this.provider = contract.provider;
//     }
 
//     authorizeDoctor = async (req: Request, res: Response) => {
//         try {
//             // Get owner's wallet 
//             const ownerWallet = new Wallet(
//                 process.env.OWNER_PRIVATE_KEY!, 
//                 this.provider
//             );
//             const contractWithSigner = this.contract.connect(ownerWallet);

//             const tx = await contractWithSigner.authorizeDoctor(req.body.doctorAddress);
//             await tx.wait();

//             res.status(200).json({ 
//                 message: 'Doctor authorized successfully', 
//                 transactionHash: tx.hash 
//             });
//         } catch (error) {
//             this.handleError(res, error, 'Failed to authorize doctor');
//         }
//     };

    

//     private handleError(res: Response, error: unknown, message: string) {
//         console.error(error);
//         res.status(500).json({ 
//             error: message, 
//             details: error instanceof Error ? error.message : String(error)
//         });
//     }

//     setupRoutes(app: express.Application) {
//         app.post('/doctor/authorize', this.authorizeDoctor);
        
//         app.post('/patient/authorize-doctor', 
//             validateEthereumAddress, 
//             this.authorizeDoctorForPatient
//         );
//         app.get('/patient/:address/records', 
//             validateEthereumAddress, 
//             this.viewPatientRecords
//         );
        
//         app.post('/prescription/create', this.createPrescription);
//         app.get('/my-prescriptions', this.getMyPrescriptions);
//     }
// }

// export {
//     DoctorManagementController,
//     createContractInstance,
//     validateEthereumAddress
// };