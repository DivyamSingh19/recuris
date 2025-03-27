import { Request, Response } from 'express';
import Web3 from 'web3';
import DiagnosticControlABI from '../../abi/DiagnosticControl.json';

class DiagnosticControlController {
    private web3: Web3;
    private contract: any;
    private contractAddress: string;

    constructor() {
       
        this.web3 = new Web3('http://127.0.0.1:7545');

        
        this.contractAddress = '0x790b9e2310672beea784949121b2B150A4365a10'; //locally deployed on ganache

        
        this.contract = new this.web3.eth.Contract(
            DiagnosticControlABI.abi, 
            this.contractAddress
        );
    }

    
    async authorizeDiagnosticCenter(req: Request, res: Response) {
        try {
            const { center, accountIndex = 0 } = req.body;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[accountIndex];

            // Send transaction
            const tx = await this.contract.methods
                .authorizeDiagnosticCenter(center)
                .send({ from: sender, gas: 300000 });

            res.status(200).json({
                message: 'Diagnostic center authorized successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Check if a Diagnostic Center is Authorized
    async checkCenterAuthorization(req: Request, res: Response) {
        try {
            const { center } = req.params;
            const { accountIndex = 0 } = req.query;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[Number(accountIndex)];

            // Call contract method
            const isAuthorized = await this.contract.methods
                .isCenterAuthorized(center)
                .call({ from: sender });

            res.status(200).json({
                center,
                isAuthorized
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Patient Authorizes a Diagnostic Center
    async authorizeCenterForPatient(req: Request, res: Response) {
        try {
            const { center, accountIndex = 1 } = req.body;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[accountIndex];

            // Send transaction
            const tx = await this.contract.methods
                .authorizeCenterForPatient(center)
                .send({ from: sender, gas: 300000 });

            res.status(200).json({
                message: 'Diagnostic center authorized for patient successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Add Diagnostic Report
    async addDiagnosticReport(req: Request, res: Response) {
        try {
            const { 
                patient, 
                reportHash, 
                reportMetadata, 
                accountIndex = 2 
            } = req.body;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[accountIndex];

            // Send transaction
            const tx = await this.contract.methods
                .addDiagnosticReport(
                    patient, 
                    reportHash, 
                    reportMetadata
                )
                .send({ from: sender, gas: 300000 });

            res.status(201).json({
                message: 'Diagnostic report added successfully',
                transactionHash: tx.transactionHash
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // View Patient Reports
    async viewPatientReports(req: Request, res: Response) {
        try {
            const { patient } = req.params;
            const { accountIndex = 2 } = req.query;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[Number(accountIndex)];

            // Call contract method
            const reports = await this.contract.methods
                .viewPatientReports(patient)
                .call({ from: sender });

            res.status(200).json({
                reports
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // View Own Reports
    async viewOwnReports(req: Request, res: Response) {
        try {
            const { accountIndex = 1 } = req.query;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[Number(accountIndex)];

            // Call contract method
            const reports = await this.contract.methods
                .viewMyReports()
                .call({ from: sender });

            res.status(200).json({
                reports
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Check Center Authorization for Patient
    async checkCenterAuthorizationForPatient(req: Request, res: Response) {
        try {
            const { center, patient } = req.params;
            const { accountIndex = 0 } = req.query;

            // Get accounts from Ganache
            const accounts = await this.web3.eth.getAccounts();
            const sender = accounts[Number(accountIndex)];

            // Call contract method
            const isAuthorized = await this.contract.methods
                .isCenterAuthorizedForPatient(center, patient)
                .call({ from: sender });

            res.status(200).json({
                center,
                patient,
                isAuthorized
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

export default new DiagnosticControlController();