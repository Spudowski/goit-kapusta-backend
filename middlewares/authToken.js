import Session from '../models/session.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWTSEC;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Logout endpoint hit'); // logout ?
  if (!token) {
    console.log('No token provided');
    return res.status(200).json({ message: 'Logout successful (no token)' });
  }
  try {
    console.log('Token received:', token);
    const blacklisted = await Session.findOne({ token });
    if (blacklisted) {
      console.log('Token added to blacklist');

      return res
        .status(401)
        .json({ error: 'Token is expired. Please log in again' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ error: 'Token has expired. Please log in again' });
    }
    return res
      .status(401)
      .json({ error: 'Invalid token. Please log in again' });
  }
};
