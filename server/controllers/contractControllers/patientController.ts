import { Request, Response } from 'express';
import Web3 from 'web3';
import PatientManagement from '../../abi/PatientManagement.json'

class PatientManagementController {
  private web3: Web3;
  private contract: any;
  private contractAddress: string;

  constructor() {
    // Connect to local Ganache blockchain
    this.web3 = new Web3('http://127.0.0.1:7545');
    
    // Contract address (you'll replace this with your deployed contract address)
    this.contractAddress = '0x...'; // Paste your actual deployed contract address here
    
    // Create contract instance
    this.contract = new this.web3.eth.Contract(PatientManagement.abi, this.contractAddress);
  }

  // Upload a new medical record
  async uploadRecord(req: Request, res: Response) {
    try {
      const { recordHash, accountIndex = 0 } = req.body;
      
      // Get accounts from Ganache
      const accounts = await this.web3.eth.getAccounts();
      const sender = accounts[accountIndex];

      // Send transaction
      const tx = await this.contract.methods.uploadRecord(
        this.web3.utils.asciiToHex(recordHash)
      ).send({ from: sender, gas: 300000 });

      res.status(201).json({
        message: 'Record uploaded successfully',
        transactionHash: tx.transactionHash
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Grant access to an entity
  async grantAccess(req: Request, res: Response) {
    try {
      const { entityAddress, accountIndex = 0 } = req.body;
      
      // Get accounts from Ganache
      const accounts = await this.web3.eth.getAccounts();
      const sender = accounts[accountIndex];

      // Send transaction
      const tx = await this.contract.methods.grantAccess(entityAddress)
        .send({ from: sender, gas: 300000 });

      res.status(200).json({
        message: 'Access granted successfully',
        transactionHash: tx.transactionHash
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // View patient's records
  async viewRecords(req: Request, res: Response) {
    try {
      const { accountIndex = 0 } = req.query;
      
      // Get accounts from Ganache
      const accounts = await this.web3.eth.getAccounts();
      const sender = accounts[Number(accountIndex)];

      // Call contract method
      const records = await this.contract.methods.viewRecords().call({ from: sender });

      res.status(200).json({
        records: records.map((record: string) => 
          this.web3.utils.hexToAscii(record)
        )
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Get access list
  async getAccessList(req: Request, res: Response) {
    try {
      const { patientAddress } = req.params;
      const { accountIndex = 0 } = req.query;
      
      // Get accounts from Ganache
      const accounts = await this.web3.eth.getAccounts();
      const sender = accounts[Number(accountIndex)];

      // Call contract method
      const accessList = await this.contract.methods.getAccessList(patientAddress)
        .call({ from: sender });

      res.status(200).json({
        accessList: accessList
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Error handling method
  private handleError(res: Response, error: any) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'An error occurred',
      error: error.toString()
    });
  }
}

export default new PatientManagementController();