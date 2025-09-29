import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { applyTutor, loginUser, signupAdmin, signupStudent } from '../controllers/authController';
import adminAuthMiddleware from '../middleware/adminAuthMiddleware';

const authRouter = Router();

authRouter.post('/sign-up', signupStudent);
authRouter.post('/sign-in',loginUser);
authRouter.post('/sign-up-admin', signupAdmin)
authRouter.post('/apply-tutor', applyTutor);

export default authRouter;
