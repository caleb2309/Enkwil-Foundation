import { Request, Response } from 'express';
import { TutorApplication } from '../models/tutorApplication.js';
import { User } from '../models/User.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// @route   GET /api/admin/applications/pending
// @desc    Get all pending tutor applications
// @access  Private (Admin)
export const getPendingApplications = async (req: Request, res: Response) => {
    try {
        const applications = await TutorApplication.find({ status: 'pending' }).sort({ createdAt: 'desc' });
        res.json(applications);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/admin/tutors/approved
// @desc    Get all approved tutors
// @access  Private (Admin)
export const getApprovedTutors = async (req: Request, res: Response) => {
    try {
        const approvedTutors = await User.find({ role: 'tutor' }).populate('tutorProfile');
        res.json(approvedTutors);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/admin/applications/:id/status
// @desc    Approve or reject a tutor application
// @access  Private (Admin)
export const updateApplicationStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
        const application = await TutorApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }

        application.status = status;
        await application.save();

        if (status === 'approved') {
            // Create a new tutor user account and link to application data
            const password = 'password123'; // A temporary password, which should be sent via email
            const newUser = new User({
                name: application.name,
                email: application.email,
                password,
                role: 'tutor',
                tutorProfile: application._id,
            });
            await newUser.save();

            // Send acceptance email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: application.email,
                subject: 'Congratulations! Your Enkwil Tutor Application Has Been Approved!',
                html: `
                    <p>Dear ${application.name},</p>
                    <p>We are delighted to inform you that your tutor application has been approved!</p>
                    <p>You can now log in to your Enkwil account using the following details:</p>
                    <p><strong>Email:</strong> ${application.email}</p>
                    <p><strong>Temporary Password:</strong> ${password}</p>
                    <p>Please log in and change your password for security reasons. Welcome to the Enkwil team!</p>
                    <br>
                    <p>Best regards,</p>
                    <p>The Enkwil Team</p>
                `,
            };
            await transporter.sendMail(mailOptions);
        }

        res.json({ msg: `Application ${status} successfully`, application });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/admin/setup
// @desc    Creates a default admin user if one doesn't exist
// @access  Public (for initial setup only)
export const setupAdmin = async (req: Request, res: Response) => {
    try {
        // Check if admin user already exists
        const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (adminUser) {
            return res.status(200).json({ msg: 'Admin user already exists.' });
        }

        // Create the admin user
        const newAdmin = new User({
            name: 'Enkwil Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin',
        });
        await newAdmin.save();

        res.status(201).json({ msg: 'Admin user created successfully.' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
