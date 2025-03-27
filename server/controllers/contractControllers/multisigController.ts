import { Request, Response } from 'express';
import Web3 from 'web3';
import MultiSigAccessABI from '../../abi/MultiSigAccess.json';

class MultiSigAccessController {
   private web3: Web3;
   private contract: any;
   private contractAddress: string;

   private handleError(res: Response, error: Error) {
    console.error('MultiSigAccess Operation Error:', error);
    res.status(500).json({
      message: 'Failed to perform operation',
      error: error.message
    });
  }

   constructor() {
     this.web3 = new Web3('http://127.0.0.1:7545');
     this.contractAddress = process.env.MULTISIGACCESS_ADDRESS as string;  
     this.contract = new this.web3.eth.Contract(MultiSigAccessABI.abi, this.contractAddress);
   }

   async getPatient(req: Request, res: Response) {
     try {
       const patient = await this.contract.methods.patient().call();
       
       res.status(200).json({
         patient: patient
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async addApprover(req: Request, res: Response) {
     try {
       const { approverAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.addApprover(approverAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Approver added successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async removeApprover(req: Request, res: Response) {
     try {
       const { approverAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.removeApprover(approverAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Approver removed successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
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
       this.handleError(res, (error as Error));
     }
   }

   async revokeAccess(req: Request, res: Response) {
     try {
       const { entityAddress, walletAddress } = req.body;

       const tx = await this.contract.methods.revokeAccess(entityAddress)
         .send({ 
           from: walletAddress, 
           gas: 300000 
         });

       res.status(200).json({
         message: 'Access revoked successfully',
         transactionHash: tx.transactionHash
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async checkAccess(req: Request, res: Response) {
     try {
       const { entityAddress } = req.params;
       const { walletAddress } = req.body;

       const hasAccess = await this.contract.methods.hasAccess(entityAddress)
         .call({ from: walletAddress });

       res.status(200).json({
         hasAccess: hasAccess
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }

   async checkIsApprover(req: Request, res: Response) {
     try {
       const { approverAddress } = req.params;
       const { walletAddress } = req.body;

       const isApprover = await this.contract.methods.approvers(approverAddress)
         .call({ from: walletAddress });

       res.status(200).json({
         isApprover: isApprover
       });
     } catch (error) {
       this.handleError(res, (error as Error));
     }
   }
}

export default new MultiSigAccessController();