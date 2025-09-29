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



//for one time use to sign up admin

export const signupAdmin = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }
        user = new User({ name, email, password, role: 'admin' });
        await user.save();
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jwt.sign(payload,ADMIN_JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
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
// Assuming User, Request, Response, bcrypt, jwt, JWT_SECRET, and ADMIN_JWT_SECRET are imported/defined.

// @route   POST /api/auth/login
// @desc    Log in an existing user (student, tutor, or admin)
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Determine the JWT Secret and the role check message
    let jwtSecret: string;
    let invalidCredentialsMsg = 'Invalid Credentials';

    try {
        // 1. Find the user by email
        let user = await User.findOne({ email });

        // 2. Initial validation: check if user exists
        if (!user) {
            return res.status(400).json({ msg: invalidCredentialsMsg });
        }

        // 3. Password validation
        const isMatch = await bcrypt.compare(password, user.password!);

        if (!isMatch) {
            return res.status(400).json({ msg: invalidCredentialsMsg });
        }

        // 4. Determine which JWT secret to use based on the user's role
        if (user.role === 'admin') {
            jwtSecret = ADMIN_JWT_SECRET;
        } else {
            // For 'student', 'tutor', or any other non-admin role
            jwtSecret = JWT_SECRET;
        }

        // 5. Create payload
        const payload = {
            user: { id: user.id, role: user.role }
        };

        // 6. Sign the JWT with the determined secret
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;

            // 7. Respond with the token and essential user data
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
