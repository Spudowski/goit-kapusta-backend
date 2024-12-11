import Session from "../models/session.js"
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWTSEC;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is missing. Please log in' });
  }

  const session = await Session.findOne({ token });
  if (session) {
    return res.status(401).json({ error: 'Token is expired. Please log in again' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
