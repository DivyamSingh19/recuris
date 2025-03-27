import { Request, Response } from 'express';
import Web3 from 'web3';
import PatientManagement from '../../abi/PatientManagement.json'
import { PrismaClient } from '@prisma/client';

class PatientManagementController {
   private web3: Web3;
   private contract: any;
   private contractAddress: string;

   constructor() {
     this.web3 = new Web3('http://127.0.0.1:7545');
     this.contractAddress = process.env.PATIENTMANAGEMENT_ADDRESS as string; 
     this.contract = new this.web3.eth.Contract(PatientManagement.abi, this.contractAddress);

     // Bind methods to maintain 'this' context
     this.uploadRecord = this.uploadRecord.bind(this);
     this.grantAccess = this.grantAccess.bind(this);
     this.viewRecords = this.viewRecords.bind(this);
     this.getAccessList = this.getAccessList.bind(this);
     this.getPrescriptions = this.getPrescriptions.bind(this);
   }
  

   async uploadRecord(req: Request, res: Response) {
     try {
       const { recordHash, walletAddress } = req.body;
       const encryption = {}
       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       if (!recordHash) {
         return res.status(400).json({
           success: false,
           message: 'Record hash is required'
         });
       }

       const hexRecordHash = this.web3.utils.asciiToHex(recordHash);

       const tx = await this.contract.methods.uploadRecord(hexRecordHash)
         .send({ 
           from: walletAddress,
           gas: 300000,
           gasPrice: await this.web3.eth.getGasPrice()
         });

       res.status(201).json({
         success: true,
         message: 'Record uploaded successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }

   async grantAccess(req: Request, res: Response) {
     try {
       const { entityAddress, walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       if (!this.web3.utils.isAddress(entityAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid entity address'
         });
       }

       const tx = await this.contract.methods.grantAccess(entityAddress)
         .send({ 
           from: walletAddress,
           gas: 300000,
           gasPrice: await this.web3.eth.getGasPrice()
         });

       res.status(200).json({
         success: true,
         message: 'Access granted successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }

   async viewRecords(req: Request, res: Response) {
     try {
       const { walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       const records = await this.contract.methods.viewRecords()
         .call({ from: walletAddress });

       res.status(200).json({
         success: true,
         records: records.map((record: string) => 
           this.web3.utils.hexToAscii(record)
         )
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }

   async getAccessList(req: Request, res: Response) {
     try {
       const { patientAddress } = req.params;
       const { walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       if (!this.web3.utils.isAddress(patientAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid patient address'
         });
       }

       const accessList = await this.contract.methods.getAccessList(patientAddress)
         .call({ from: walletAddress });

       res.status(200).json({
         success: true,
         accessList: accessList
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }

   async getPrescriptions(req: Request, res: Response) {
     try {
       const { walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       // Call the contract method to get prescriptions
       const prescriptions = await this.contract.methods.viewMyPrescriptions()
         .call({ from: walletAddress });

       res.status(200).json({
         success: true,
         prescriptions: prescriptions
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }

   private handleError(res: Response, error: any) {
     console.error('Error:', error);
     
     if (error.message && error.message.includes('VM Exception while processing transaction')) {
       return res.status(400).json({
         success: false,
         message: 'Transaction failed',
         error: error.message
       });
     }

     // Default error response
     res.status(500).json({
       success: false,
       message: 'An error occurred',
       error: error.message || error.toString()
     });
   }
}

export default new PatientManagementController();