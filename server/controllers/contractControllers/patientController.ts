import { Request, Response } from 'express';
import Web3 from 'web3';
import PatientManagement from '../../abi/PatientManagement.json';
 

class PatientManagementController {
   private web3: Web3;
   private contract: any;
   private contractAddress: string;

   constructor() {
     this.web3 = new Web3('http://127.0.0.1:7545');
     this.contractAddress = process.env.PATIENTMANAGEMENT_ADDRESS as string; 
     this.contract = new this.web3.eth.Contract(PatientManagement.abi, this.contractAddress);
     
     
     this.uploadRecord = this.uploadRecord.bind(this);
     this.grantAccess = this.grantAccess.bind(this);
     this.viewRecords = this.viewRecords.bind(this);
     this.getAccessList = this.getAccessList.bind(this);
     this.getPrescriptions = this.getPrescriptions.bind(this);
     this.grantInsuranceAgentAccess = this.grantInsuranceAgentAccess.bind(this);
     this.revokeInsuranceAgentAccess = this.revokeInsuranceAgentAccess.bind(this);
     this.checkInsuranceAgentAccess = this.checkInsuranceAgentAccess.bind(this);
   }
  
   async uploadRecord(req: Request, res: Response) {
     try {
       const { recordHash, walletAddress } = req.body;
       const encryption = {};
       
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
   
   // New method to grant time-limited access to insurance agents (8 hours)
   async grantInsuranceAgentAccess(req: Request, res: Response) {
     try {
       const { agentAddress, walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       if (!this.web3.utils.isAddress(agentAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid insurance agent address'
         });
       }

       const tx = await this.contract.methods.grantInsuranceAgentAccess(agentAddress)
         .send({ 
           from: walletAddress,
           gas: 300000,
           gasPrice: await this.web3.eth.getGasPrice()
         });

       // Calculate expiry time for information purposes (8 hours from now)
       const expiryTime = new Date(Date.now() + 8 * 60 * 60 * 1000);

       res.status(200).json({
         success: true,
         message: 'Insurance agent access granted successfully (valid for 8 hours)',
         expiresAt: expiryTime.toISOString(),
         transactionHash: tx.transactionHash
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }
   
   // New method to revoke insurance agent access before expiry
   async revokeInsuranceAgentAccess(req: Request, res: Response) {
     try {
       const { agentAddress, walletAddress } = req.body;

       if (!this.web3.utils.isAddress(walletAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid wallet address'
         });
       }

       if (!this.web3.utils.isAddress(agentAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid insurance agent address'
         });
       }

       const tx = await this.contract.methods.revokeInsuranceAgentAccess(agentAddress)
         .send({ 
           from: walletAddress,
           gas: 300000,
           gasPrice: await this.web3.eth.getGasPrice()
         });

       res.status(200).json({
         success: true,
         message: 'Insurance agent access revoked successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error: any) {
       this.handleError(res, error);
     }
   }
   
   // New method to check if an insurance agent has access
   async checkInsuranceAgentAccess(req: Request, res: Response) {
     try {
       const { patientAddress, agentAddress } = req.params;

       if (!this.web3.utils.isAddress(patientAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid patient address'
         });
       }

       if (!this.web3.utils.isAddress(agentAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid agent address'
         });
       }

       const [hasAccess, expiryTimestamp] = await this.contract.methods.checkInsuranceAgentAccess(patientAddress, agentAddress)
         .call();
         
       // Convert blockchain timestamp (seconds) to JavaScript timestamp (milliseconds)
       const expiryDate = new Date(Number(expiryTimestamp) * 1000);
       const currentTime = new Date();
       
       res.status(200).json({
         success: true,
         hasAccess: hasAccess,
         expiryTimestamp: Number(expiryTimestamp),
         expiryDate: expiryDate.toISOString(),
         isExpired: currentTime > expiryDate,
         timeRemaining: hasAccess ? Math.floor((Number(expiryTimestamp) * 1000 - Date.now()) / 60000) + ' minutes' : '0 minutes'
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
   
   // Method for insurance agents to view patient records
   async viewPatientRecords(req: Request, res: Response) {
     try {
       const { patientAddress, agentAddress } = req.body;

       if (!this.web3.utils.isAddress(patientAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid patient address'
         });
       }

       if (!this.web3.utils.isAddress(agentAddress)) {
         return res.status(400).json({
           success: false,
           message: 'Invalid agent address'
         });
       }
       
       console.log(`Agent ${agentAddress} attempting to view records for patient ${patientAddress}`);
       
       // First check if agent has access
       const [hasAccess, expiryTimestamp] = await this.contract.methods.checkInsuranceAgentAccess(patientAddress, agentAddress)
         .call();
         
       if (!hasAccess) {
         console.log('Access check: Not authorized');
         return res.status(403).json({
           success: false,
           message: 'Not authorized to access patient records'
         });
       }
       
       console.log('Access check: Authorized');

       const records = await this.contract.methods.viewPatientRecords(patientAddress)
         .call({ from: agentAddress });

       res.status(200).json({
         success: true,
         expiresAt: new Date(Number(expiryTimestamp) * 1000).toISOString(),
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