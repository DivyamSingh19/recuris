import express from 'express';
import insuranceController from '../../controllers/contractControllers/insuranceProviderController';

const insuranceRouter = express.Router();

// Route to upload health record
insuranceRouter.post('/records', insuranceController.uploadHealthRecord);

 
insuranceRouter.post('/authorize-agent', insuranceController.authorizeAgent);
insuranceRouter.post('/deauthorize-agent', insuranceController.deauthorizeAgent);

 
insuranceRouter.post('/claims', insuranceController.submitClaim);

 
insuranceRouter.post('/patient-records', insuranceController.viewPatientRecords);
insuranceRouter.post('/patient-claims', insuranceController.viewPatientClaims);

 
insuranceRouter.post('/my-records', insuranceController.viewMyRecords);
insuranceRouter.post('/my-claims', insuranceController.viewMyClaims);

export default insuranceRouter;