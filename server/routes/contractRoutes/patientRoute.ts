import express, { RequestHandler } from 'express';
import PatientManagementController from '../../controllers/contractControllers/patientController';

const patientRoutes = express.Router();

 
patientRoutes.post('/records', PatientManagementController.uploadRecord as RequestHandler);

 
patientRoutes.post('/access', PatientManagementController.grantAccess as RequestHandler);

 
patientRoutes.get('/view-records', PatientManagementController.viewRecords as RequestHandler);

 
patientRoutes.get('/access-list/:patientAddress', PatientManagementController.getAccessList as RequestHandler);
 
patientRoutes.get('/prescriptions', PatientManagementController.getPrescriptions as RequestHandler);

 
patientRoutes.post('/grant-insurance-access', PatientManagementController.grantInsuranceAgentAccess as RequestHandler);
 
patientRoutes.post('/revoke-insurance-access', PatientManagementController.revokeInsuranceAgentAccess as RequestHandler);

 
patientRoutes.get('/check-insurance-access/:patientAddress/:agentAddress', PatientManagementController.checkInsuranceAgentAccess as RequestHandler);

 
patientRoutes.post('/view-patient-records', PatientManagementController.viewPatientRecords as RequestHandler);

export default patientRoutes;