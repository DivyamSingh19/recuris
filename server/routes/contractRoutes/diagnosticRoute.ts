import express from 'express';
import DiagnosticControlController from '../../controllers/contractControllers/diagnosticController';

const diagnosticRouter = express.Router();
 
diagnosticRouter.post('/center/authorize', 
    DiagnosticControlController.authorizeDiagnosticCenter.bind(DiagnosticControlController)
);

diagnosticRouter.get('/center/:center/check', 
    DiagnosticControlController.checkCenterAuthorization.bind(DiagnosticControlController)
);

 
diagnosticRouter.post('/patient/authorize-center', 
    DiagnosticControlController.authorizeCenterForPatient.bind(DiagnosticControlController)
);

diagnosticRouter.post('/patient/report', 
    DiagnosticControlController.addDiagnosticReport.bind(DiagnosticControlController)
);

diagnosticRouter.get('/patient/:patient/reports', 
    DiagnosticControlController.viewPatientReports.bind(DiagnosticControlController)
);

diagnosticRouter.get('/patient/my-reports', 
    DiagnosticControlController.viewOwnReports.bind(DiagnosticControlController)
);

diagnosticRouter.get('/patient/:center/:patient/authorization', 
    DiagnosticControlController.checkCenterAuthorizationForPatient.bind(DiagnosticControlController)
);

export default diagnosticRouter;