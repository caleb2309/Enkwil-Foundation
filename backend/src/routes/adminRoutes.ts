import { Router } from 'express';
import { getPendingApplications, getApprovedTutors, updateApplicationStatus, setupAdmin } from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/pending-applications', getPendingApplications);
adminRouter.get('/approved-tutors', getApprovedTutors);
adminRouter.put('/application-status', updateApplicationStatus);

export default adminRouter;