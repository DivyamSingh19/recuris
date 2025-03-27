import { Request, Response } from 'express';
import Web3 from 'web3';
import PatientManagement from '../../abi/PatientManagement.json';

class PatientManagementController {
   private web3: Web3;
   private contract: any;
   private contractAddress: string;

   constructor() {
     // Connect to local Ganache blockchain
     this.web3 = new Web3('http://127.0.0.1:7545');
     this.contractAddress = '0x7C7fd0e88976E8626d483ADB78eacfF064b32180'; // locally deployed using Ganache
     this.contract = new this.web3.eth.Contract(PatientManagement.abi, this.contractAddress);
   }

   async uploadRecord(req: Request, res: Response) {
     try {
       const { recordHash, walletAddress } = req.body;

       const tx = await this.contract.methods.uploadRecord(
         this.web3.utils.asciiToHex(recordHash)
       ).send({ 
         from: walletAddress, 
         gas: 300000 
       });

       res.status(201).json({
         message: 'Record uploaded successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, error);
     }
   }

   async grantAccess(req: Request, res: Response) {
     try {
       const { entityAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.grantAccess(entityAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Access granted successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, error);
     }
   }

   async viewRecords(req: Request, res: Response) {
     try {
       const { walletAddress } = req.body;

       const records = await this.contract.methods.viewRecords()
         .call({ from: walletAddress });

       res.status(200).json({
         records: records.map((record: string) => 
           this.web3.utils.hexToAscii(record)
         )
       });
     } catch (error) {
       this.handleError(res, error);
     }
   }

   async getAccessList(req: Request, res: Response) {
     try {
       const { patientAddress } = req.params;
       const { walletAddress } = req.body;

       const accessList = await this.contract.methods.getAccessList(patientAddress)
         .call({ from: walletAddress });

       res.status(200).json({
         accessList: accessList
       });
     } catch (error) {
       this.handleError(res, error);
     }
   }

   private handleError(res: Response, error: any) {
     console.error('Error:', error);
     res.status(500).json({
       message: 'An error occurred',
       error: error.toString()
     });
   }
}

export default new PatientManagementController();