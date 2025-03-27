import express from 'express';
import PatientManagementController from '../../controllers/contractControllers/patientController';

const patientRouter = express.Router();

 
patientRouter.post('/records', PatientManagementController.uploadRecord.bind(PatientManagementController));

 
patientRouter.post('/access', PatientManagementController.grantAccess.bind(PatientManagementController));

 
patientRouter.get('/view-records', PatientManagementController.viewRecords.bind(PatientManagementController));

 
patientRouter.get('/access-list/:patientAddress', PatientManagementController.getAccessList.bind(PatientManagementController));

export default patientRouter;