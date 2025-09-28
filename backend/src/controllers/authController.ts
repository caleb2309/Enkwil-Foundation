import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { TutorApplication } from '../models/tutorApplication.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-for-users';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'another-super-secret-key-for-admin';

// @route   POST /api/auth/signup/student
// @desc    Register a new student user
// @access  Public
export const signupStudent = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }
        user = new User({ name, email, password, role: 'student' });
        await user.save();
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/auth/login
// @desc    Log in an existing user (student or tutor)
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/auth/admin/login
// @desc    Log in the admin user
// @access  Public
export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/auth/tutor/apply
// @desc    Submit a new tutor application
// @access  Public
export const applyTutor = async (req: Request, res: Response) => {
    const { name, email, phone, qualifications, bio, location, courses } = req.body;
    try {
        let application = await TutorApplication.findOne({ email });
        if (application) {
            return res.status(400).json({ msg: 'An application with this email has already been submitted.' });
        }
        application = new TutorApplication({
            name,
            email,
            phone,
            qualifications,
            bio,
            location,
            courses,
        });
        await application.save();
        res.status(201).json({ msg: 'Tutor application submitted successfully. We will review it shortly.' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
