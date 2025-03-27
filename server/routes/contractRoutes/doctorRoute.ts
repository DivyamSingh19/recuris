import express from 'express';
import DoctorManagementController from '../../controllers/contractControllers/doctorController';

const doctorRouter = express.Router();

 
doctorRouter.post('/authorize-doctor', DoctorManagementController.authorizeDoctor);
doctorRouter.post('/deauthorize-doctor', DoctorManagementController.deauthorizeDoctor);

 
doctorRouter.post('/authorize-doctor-for-patient', DoctorManagementController.authorizeDocterForPatient);
doctorRouter.post('/deauthorize-doctor-for-patient', DoctorManagementController.deauthorizeDoctorForPatient);

 
doctorRouter.post('/view-patient-records', DoctorManagementController.viewPatientRecords);
doctorRouter.post('/create-prescription', DoctorManagementController.createPrescription);
doctorRouter.post('/get-patient-prescriptions', DoctorManagementController.getPatientPrescriptions);

 
doctorRouter.post('/my-records', DoctorManagementController.viewMyRecords);
doctorRouter.post('/my-prescriptions', DoctorManagementController.viewMyPrescriptions);

export default doctorRouter;