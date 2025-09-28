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
exports.contactTutor = exports.getTutorById = exports.findATutor = exports.getAllTutors = void 0;
const User_js_1 = require("../models/User.js");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Nodemailer transporter setup
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// @route   GET /api/tutors
// @desc    Get all approved tutors with their profiles
// @access  Public
const getAllTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutors = yield User_js_1.User.find({ role: 'tutor' }).populate('tutorProfile');
        res.json(tutors);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getAllTutors = getAllTutors;
const findATutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { detail } = req.body;
    try {
        const tutor = yield User_js_1.User.find({ courses: detail });
        if (!tutor) {
            const tutor = yield User_js_1.User.find({ name: detail });
        }
        ;
        res.json(tutor);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});
exports.findATutor = findATutor;
// @route   GET /api/tutors/:id
// @desc    Get a single tutor by their user ID
// @access  Public
const getTutorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = yield User_js_1.User.findById(req.params.id)
            .where('role').equals('tutor') // Ensure the user is a tutor
            .populate('tutorProfile');
        if (!tutor) {
            return res.status(404).json({ msg: 'Tutor not found' });
        }
        res.json(tutor);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tutor not found' });
        }
        res.status(500).send('Server Error');
    }
});
exports.getTutorById = getTutorById;
// @route   POST /api/tutors/contact/:id
// @desc    Send a contact inquiry to a specific tutor
// @access  Public
const contactTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    const tutorId = req.params.id;
    try {
        const tutor = yield User_js_1.User.findById(tutorId).select('email');
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
        yield transporter.sendMail(mailOptions);
        res.json({ msg: 'Message sent successfully!' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.contactTutor = contactTutor;
