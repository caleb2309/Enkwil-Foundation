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
exports.applyTutor = exports.loginUser = exports.signupAdmin = exports.signupStudent = void 0;
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
//for one time use to sign up admin
const signupAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield User_js_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }
        user = new User_js_1.User({ name, email, password, role: 'admin' });
        yield user.save();
        const payload = {
            user: { id: user.id, role: user.role }
        };
        jsonwebtoken_1.default.sign(payload, ADMIN_JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
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
exports.signupAdmin = signupAdmin;
// @route   POST /api/auth/login
// @desc    Log in an existing user (student or tutor)
// @access  Public
// Assuming User, Request, Response, bcrypt, jwt, JWT_SECRET, and ADMIN_JWT_SECRET are imported/defined.
// @route   POST /api/auth/login
// @desc    Log in an existing user (student, tutor, or admin)
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Determine the JWT Secret and the role check message
    let jwtSecret;
    let invalidCredentialsMsg = 'Invalid Credentials';
    try {
        // 1. Find the user by email
        let user = yield User_js_1.User.findOne({ email });
        // 2. Initial validation: check if user exists
        if (!user) {
            return res.status(400).json({ msg: invalidCredentialsMsg });
        }
        // 3. Password validation
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: invalidCredentialsMsg });
        }
        // 4. Determine which JWT secret to use based on the user's role
        if (user.role === 'admin') {
            jwtSecret = ADMIN_JWT_SECRET;
        }
        else {
            // For 'student', 'tutor', or any other non-admin role
            jwtSecret = JWT_SECRET;
        }
        // 5. Create payload
        const payload = {
            user: { id: user.id, role: user.role }
        };
        // 6. Sign the JWT with the determined secret
        jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            // 7. Respond with the token and essential user data
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.loginUser = loginUser;
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
