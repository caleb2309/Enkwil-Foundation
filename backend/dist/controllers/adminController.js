"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdmin = exports.updateApplicationStatus = exports.getApprovedTutors = exports.getPendingApplications = void 0;
const tutorApplication_js_1 = require("../models/tutorApplication.js");
const User_js_1 = require("../models/User.js");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// @route   GET /api/admin/applications/pending
// @desc    Get all pending tutor applications
// @access  Private (Admin)
const getPendingApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield tutorApplication_js_1.TutorApplication.find({ status: 'pending' }).sort({ createdAt: 'desc' });
        res.json(applications);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getPendingApplications = getPendingApplications;
// @route   GET /api/admin/tutors/approved
// @desc    Get all approved tutors
// @access  Private (Admin)
const getApprovedTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedTutors = yield User_js_1.User.find({ role: 'tutor' }).populate('tutorProfile');
        res.json(approvedTutors);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getApprovedTutors = getApprovedTutors;
// @route   PUT /api/admin/applications/:id/status
// @desc    Approve or reject a tutor application
// @access  Private (Admin)
const updateApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    try {
        const application = yield tutorApplication_js_1.TutorApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }
        application.status = status;
        yield application.save();
        if (status === 'approved') {
            // Create a new tutor user account and link to application data
            const password = 'password123'; // A temporary password, which should be sent via email
            const newUser = new User_js_1.User({
                name: application.name,
                email: application.email,
                password,
                role: 'tutor',
                tutorProfile: application._id,
            });
            yield newUser.save();
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
            yield transporter.sendMail(mailOptions);
        }
        res.json({ msg: `Application ${status} successfully`, application });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
// @route   POST /api/admin/setup
// @desc    Creates a default admin user if one doesn't exist
// @access  Public (for initial setup only)
const setupAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if admin user already exists
        const adminUser = yield User_js_1.User.findOne({ email: process.env.ADMIN_EMAIL });
        if (adminUser) {
            return res.status(200).json({ msg: 'Admin user already exists.' });
        }
        // Create the admin user
        const newAdmin = new User_js_1.User({
            name: 'Enkwil Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin',
        });
        yield newAdmin.save();
        res.status(201).json({ msg: 'Admin user created successfully.' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.setupAdmin = setupAdmin;
