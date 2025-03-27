import express from 'express';
import DiagnosticControlController from '../../controllers/contractControllers/diagnosticController';

const router = express.Router();

// Diagnostic Center Routes
router.post('/center/authorize', 
    DiagnosticControlController.authorizeDiagnosticCenter.bind(DiagnosticControlController)
);

router.get('/center/:center/check', 
    DiagnosticControlController.checkCenterAuthorization.bind(DiagnosticControlController)
);

 
router.post('/patient/authorize-center', 
    DiagnosticControlController.authorizeCenterForPatient.bind(DiagnosticControlController)
);

router.post('/patient/report', 
    DiagnosticControlController.addDiagnosticReport.bind(DiagnosticControlController)
);

router.get('/patient/:patient/reports', 
    DiagnosticControlController.viewPatientReports.bind(DiagnosticControlController)
);

router.get('/patient/my-reports', 
    DiagnosticControlController.viewOwnReports.bind(DiagnosticControlController)
);

router.get('/patient/:center/:patient/authorization', 
    DiagnosticControlController.checkCenterAuthorizationForPatient.bind(DiagnosticControlController)
);

export default router;