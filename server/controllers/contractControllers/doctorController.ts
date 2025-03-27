import { Request, Response } from 'express';
import Web3 from 'web3';
import DoctorManagement from '../../abi/DoctorManagement.json';

class DoctorManagementController {
   private web3: Web3;
   private contract: any;
   private contractAddress: string;

   private handleError(res: Response, error: Error) {
    console.error('Prescription Creation Error:', error);
    res.status(500).json({
      message: 'Failed to create prescription',
      error: error.message
    });
  }

   constructor() {
      
     this.web3 = new Web3('http://127.0.0.1:7545');
     this.contractAddress = process.env.DOCTORMANAGEMENT_ADDRESS as string;  
     this.contract = new this.web3.eth.Contract(DoctorManagement.abi, this.contractAddress);
   }

   async authorizeDoctor(req: Request, res: Response) {
     try {
       const { doctorAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.authorizeDoctor(doctorAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Doctor authorized successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async deauthorizeDoctor(req: Request, res: Response) {
     try {
       const { doctorAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.deauthorizeDoctor(doctorAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Doctor deauthorized successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async authorizeDocterForPatient(req: Request, res: Response) {
     try {
       const { doctorAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.authorizeDocterForPatient(doctorAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Doctor authorized for patient successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async deauthorizeDoctorForPatient(req: Request, res: Response) {
     try {
       const { doctorAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.deauthorizeDoctorForPatient(doctorAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Doctor deauthorized for patient successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async viewPatientRecords(req: Request, res: Response) {
     try {
       const {   walletAddress,  doctorWalletAddress } = req.body;

       const records = await this.contract.methods.viewPatientRecords(walletAddress)
         .call({ from: doctorWalletAddress });

       res.status(200).json({
         records: records
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async createPrescription(req: Request, res: Response) {
     try {
       const { 
         patientAddress, 
         medication, 
         dosage, 
         frequency, 
         durationDays,
         walletAddress 
       } = req.body;

       const tx = await this.contract.methods.createPrescription(
         patientAddress,
         medication,
         dosage,
         frequency,
         durationDays
       ).send({ 
         from: walletAddress, 
         gas: 300000 
       });

       res.status(201).json({
         message: 'Prescription created successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async getPatientPrescriptions(req: Request, res: Response) {
     try {
       const { patientAddress, walletAddress } = req.body;

       const prescriptions = await this.contract.methods.getPatientPrescriptions(patientAddress)
         .call({ from: walletAddress });

       res.status(200).json({
         prescriptions: prescriptions
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async viewMyRecords(req: Request, res: Response) {
     try {
       const { walletAddress } = req.body;

       const records = await this.contract.methods.viewMyRecords()
         .call({ from: walletAddress });

       res.status(200).json({
         records: records
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async viewMyPrescriptions(req: Request, res: Response) {
     try {
       const { walletAddress } = req.body;

       const prescriptions = await this.contract.methods.viewMyPrescriptions()
         .call({ from: walletAddress });

       res.status(200).json({
         prescriptions: prescriptions
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   
}

export default new DoctorManagementController();