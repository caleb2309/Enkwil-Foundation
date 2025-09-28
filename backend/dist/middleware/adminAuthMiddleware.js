"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'another-super-secret-key-for-admin';
const adminAuthMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    // Check if no token is found
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // Verify token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ADMIN_JWT_SECRET);
        req.user = decoded.user;
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied: not an administrator' });
        }
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.default = adminAuthMiddleware;
