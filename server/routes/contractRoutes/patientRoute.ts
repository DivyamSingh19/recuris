import express, { RequestHandler } from 'express';
import PatientManagementController from '../../controllers/contractControllers/patientController';

const patientRoutes = express.Router();

// Record Upload Route
patientRoutes.post('/records', PatientManagementController.uploadRecord as RequestHandler);

// Grant Access Route
patientRoutes.post('/access', PatientManagementController.grantAccess as RequestHandler);

// View Records Route
patientRoutes.get('/records', PatientManagementController.viewRecords as RequestHandler);

// Get Access List Route
patientRoutes.get('/access-list/:patientAddress', PatientManagementController.getAccessList as RequestHandler);

export default patientRoutes;