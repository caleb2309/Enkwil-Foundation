import { Router } from 'express';
import { getAllTutors, getTutorById, contactTutor, findATutor } from '../controllers/tutorController';

const tutorRouter = Router();

tutorRouter.get('/all-tutors', getAllTutors);
tutorRouter.post('/find-a-tutor', findATutor)
tutorRouter.get('/:id', getTutorById);
tutorRouter.post('/contact-tutor', contactTutor);

export default tutorRouter;
