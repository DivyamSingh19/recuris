// import express, { Request, Response, NextFunction } from 'express';
// import { Contract } from 'ethers';
// import { DoctorManagementController, validateEthereumAddress } from '../../controllers/contractControllers/doctorController';

 
// type RouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

 
// const asyncHandler = (fn: RouteHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };

// export const setupDoctorRoutes = (
//     app: express.Application, 
//     contract: Contract
// ): void => {
//     const doctorController = new DoctorManagementController(contract);

//     // Doctor Authorization Routes
//     app.post('/doctor/authorize', 
//         validateEthereumAddress, 
//         asyncHandler(doctorController.authorizeDoctor)
//     );

//     // Patient Routes
//     app.post('/patient/authorize-doctor', 
//         validateEthereumAddress, 
//         asyncHandler(doctorController.authorizeDoctorForPatient)
//     );

//     app.get('/patient/:address/records', 
//         validateEthereumAddress, 
//         asyncHandler(doctorController.viewPatientRecords)
//     );

//     // Prescription Routes
//     app.post('/prescription/create', 
//         validateEthereumAddress, 
//         asyncHandler(doctorController.createPrescription)
//     );

//     app.get('/my-prescriptions', 
//         asyncHandler(doctorController.getMyPrescriptions)
//     );
// };