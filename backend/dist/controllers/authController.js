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
exports.applyTutor = exports.loginAdmin = exports.loginUser = exports.signupStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = require("../models/User.js");
const tutorApplication_js_1 = require("../models/tutorApplication.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-for-users';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'another-super-secret-key-for-admin';
// @route   POST /api/auth/signup/student
// @desc    Register a new student user
// @access  Public
const signupStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield User_js_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }
        user = new User_js_1.User({ name, email, password, role: 'student' });
        yield user.save();
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.status(201).json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.signupStudent = signupStudent;
// @route   POST /api/auth/login
// @desc    Log in an existing user (student or tutor)
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_js_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.loginUser = loginUser;
// @route   POST /api/auth/admin/login
// @desc    Log in the admin user
// @access  Public
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_js_1.User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jsonwebtoken_1.default.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.loginAdmin = loginAdmin;
// @route   POST /api/auth/tutor/apply
// @desc    Submit a new tutor application
// @access  Public
const applyTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, qualifications, bio, location, courses } = req.body;
    try {
        let application = yield tutorApplication_js_1.TutorApplication.findOne({ email });
        if (application) {
            return res.status(400).json({ msg: 'An application with this email has already been submitted.' });
        }
        application = new tutorApplication_js_1.TutorApplication({
            name,
            email,
            phone,
            qualifications,
            bio,
            location,
            courses,
        });
        yield application.save();
        res.status(201).json({ msg: 'Tutor application submitted successfully. We will review it shortly.' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.applyTutor = applyTutor;
