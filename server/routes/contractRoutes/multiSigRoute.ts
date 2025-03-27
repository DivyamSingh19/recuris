import express from 'express';
import MultiSigAccessController from '../../controllers/contractControllers/multisigController';

const multiSigRouter = express.Router();

// Get patient address
multiSigRouter.get('/patient', MultiSigAccessController.getPatient);

// Add approver (only patient can do this)
multiSigRouter.post('/approver/add', MultiSigAccessController.addApprover);

// Remove approver (only patient can do this)
multiSigRouter.post('/approver/remove', MultiSigAccessController.removeApprover);

// Grant access to an entity (only approvers can do this)
multiSigRouter.post('/access/grant', MultiSigAccessController.grantAccess);

// Revoke access from an entity (only approvers can do this)
multiSigRouter.post('/access/revoke', MultiSigAccessController.revokeAccess);

// Check if an entity has access
multiSigRouter.get('/access/:entityAddress', MultiSigAccessController.checkAccess);

// Check if an address is an approver
multiSigRouter.get('/approver/:approverAddress', MultiSigAccessController.checkIsApprover);

export default multiSigRouter;