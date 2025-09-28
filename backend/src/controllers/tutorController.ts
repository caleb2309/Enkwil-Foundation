import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { TutorApplication } from '../models/tutorApplication.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// @route   GET /api/tutors
// @desc    Get all approved tutors with their profiles
// @access  Public
export const getAllTutors = async (req: Request, res: Response) => {
    try {
        const tutors = await User.find({ role: 'tutor' }).populate('tutorProfile');
        res.json(tutors);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export const findATutor = async (req: Request, res: Response) => {
    const { detail } = req.body;
    try {
        // Search in courses first, then in name
        const tutorsByCourse = await User.find({ 
            role: 'tutor',
            'tutorProfile.courses': { $regex: detail, $options: 'i' }
        }).populate('tutorProfile');

        if (tutorsByCourse.length > 0) {
            return res.json(tutorsByCourse);
        }

        // If no tutors found by course, search by name
        const tutorsByName = await User.find({ 
            role: 'tutor',
            name: { $regex: detail, $options: 'i' }
        }).populate('tutorProfile');

        res.json(tutorsByName);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
}

// @route   GET /api/tutors/:id
// @desc    Get a single tutor by their user ID
// @access  Public
export const getTutorById = async (req: Request, res: Response) => {
    try {
        const tutor = await User.findById(req.params.id)
            .where('role').equals('tutor') // Ensure the user is a tutor
            .populate('tutorProfile');

        if (!tutor) {
            return res.status(404).json({ msg: 'Tutor not found' });
        }
        res.json(tutor);
    } catch (err: any) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tutor not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/tutors/contact/:id
// @desc    Send a contact inquiry to a specific tutor
// @access  Public
export const contactTutor = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    const tutorId = req.params.id;
    try {
        const tutor = await User.findById(tutorId).select('email');
        if (!tutor) {
            return res.status(404).json({ msg: 'Tutor not found' });
        }
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: tutor.email, 
            subject: `New Inquiry from ${name} via Enkwil`,
            html: `
                <p>Hello,</p>
                <p>You have received a new inquiry from a student via Enkwil.</p>
                <p><strong>Student Name:</strong> ${name}</p>
                <p><strong>Student Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <br>
                <p>Please respond to them directly via their email.</p>
                <br>
                <p>Thank you,</p>
                <p>The Enkwil Team</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Message sent successfully!' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
