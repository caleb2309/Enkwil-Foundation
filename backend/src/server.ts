import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db';
import adminRouter from './routes/adminRoutes';
import authRouter from './routes/authRoutes';
import tutorRouter from './routes/tutorRoutes';
import authMiddleware from './middleware/authMiddleware';
import adminAuthMiddleware from './middleware/adminAuthMiddleware';

const app = express();
const PORT = process.env.PORT as any;

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tutor', tutorRouter);
app.use('/api/v1/admin', adminRouter);

connectDB();

app.listen(PORT, '0.0.0.0' ,()=>{
    console.log(`Server is listening on Port: ${PORT}...`);
})