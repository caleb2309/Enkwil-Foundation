import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extend the Request object to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'another-super-secret-key-for-admin';

const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token is found
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded: any = jwt.verify(token, ADMIN_JWT_SECRET);
    req.user = decoded.user;
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: not an administrator' });
    }
    next();
  } catch (err) {
console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default adminAuthMiddleware;
