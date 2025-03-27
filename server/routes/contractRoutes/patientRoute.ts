import express from 'express';
import PatientManagementController from '../../controllers/contractControllers/patientController';

const router = express.Router();

// Record Upload Route
router.post('/records', PatientManagementController.uploadRecord.bind(PatientManagementController));

// Grant Access Route
router.post('/access', PatientManagementController.grantAccess.bind(PatientManagementController));

// View Records Route
router.get('/records', PatientManagementController.viewRecords.bind(PatientManagementController));

// Get Access List Route
router.get('/access-list/:patientAddress', PatientManagementController.getAccessList.bind(PatientManagementController));

export default router;