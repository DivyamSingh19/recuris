import { Request, Response } from 'express';
import Web3 from 'web3';
import InsuranceProvider from '../../abi/InsuranceProvider.json';

class InsuranceController {
    private web3: Web3;
    private contract: any;
    private contractAddress: string;

    private handleError(res: Response, error: Error, customMessage?: string) {
        console.error('Insurance Operation Error:', error);
        res.status(500).json({
            message: customMessage || 'Failed to perform operation',
            error: error.message
        });
    }

    constructor() {
        this.web3 = new Web3('http://127.0.0.1:7545');
        this.contractAddress = process.env.INSURANCEPROVIDER_ADDRESS as string;
        this.contract = new this.web3.eth.Contract(InsuranceProvider.abi, this.contractAddress);
        
        // Binding all methods to preserve 'this' context
        this.uploadHealthRecord = this.uploadHealthRecord.bind(this);
        this.authorizeAgent = this.authorizeAgent.bind(this);
        this.deauthorizeAgent = this.deauthorizeAgent.bind(this);
        this.submitClaim = this.submitClaim.bind(this);
        this.viewPatientRecords = this.viewPatientRecords.bind(this);
        this.viewPatientClaims = this.viewPatientClaims.bind(this);
        this.viewMyRecords = this.viewMyRecords.bind(this);
        this.viewMyClaims = this.viewMyClaims.bind(this);
    }

    async uploadHealthRecord(req: Request, res: Response) {
        try {
            const { recordHash, recordType, walletAddress } = req.body;

            const tx = await this.contract.methods.uploadHealthRecord(recordHash, recordType)
                .send({ 
                    from: walletAddress, 
                    gas: 300000 
                });

            res.status(201).json({
                message: 'Health record uploaded successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to upload health record');
        }
    }

    async authorizeAgent(req: Request, res: Response) {
        try {
            const { agentAddress, walletAddress } = req.body;

            const tx = await this.contract.methods.authorizeAgent(agentAddress)
                .send({ 
                    from: walletAddress, 
                    gas: 300000 
                });

            res.status(200).json({
                message: 'Agent authorized successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to authorize agent');
        }
    }

    async deauthorizeAgent(req: Request, res: Response) {
        try {
            const { agentAddress, walletAddress } = req.body;

            const tx = await this.contract.methods.deauthorizeAgent(agentAddress)
                .send({ 
                    from: walletAddress, 
                    gas: 300000 
                });

            res.status(200).json({
                message: 'Agent deauthorized successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to deauthorize agent');
        }
    }

    async submitClaim(req: Request, res: Response) {
        try {
            const { 
                claimType, 
                claimAmount, 
                walletAddress 
            } = req.body;

            const tx = await this.contract.methods.submitClaim(
                claimType,
                claimAmount
            ).send({ 
                from: walletAddress, 
                gas: 300000 
            });

            res.status(201).json({
                message: 'Claim submitted successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to submit claim');
        }
    }

    async viewPatientRecords(req: Request, res: Response) {
        try {
            const { walletAddress,  entityAddress } = req.body;

            const records = await this.contract.methods.viewPatientRecords(walletAddress)
                .call({ from: entityAddress });

            res.status(200).json({
                records: records
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to retrieve patient records');
        }
    }

    async viewPatientClaims(req: Request, res: Response) {
        try {
            const { walletAddress,  entityAddress } = req.body;

            const claims = await this.contract.methods.viewPatientClaims(walletAddress)
                .call({ from: entityAddress });

            res.status(200).json({
                claims: claims
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to retrieve patient claims');
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
            this.handleError(res, error as Error, 'Failed to retrieve your records');
        }
    }

    async viewMyClaims(req: Request, res: Response) {
        try {
            const { walletAddress } = req.body;

            const claims = await this.contract.methods.viewMyClaims()
                .call({ from: walletAddress });

            res.status(200).json({
                claims: claims
            });
        } catch (error) {
            this.handleError(res, error as Error, 'Failed to retrieve your claims');
        }
    }
}

 
const insuranceController = new InsuranceController();
export default insuranceController;