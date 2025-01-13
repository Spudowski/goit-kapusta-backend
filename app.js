import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();

// Not in use:
// import authRoutes from './routes/api/authRoutes.js';
// app.use('/api/auth', authRoutes);

import authRouter from './routes/api/auth.js';
app.use('/api/auth', authRouter);

import usersRouter from './routes/api/user.js';
app.use('/api/user', usersRouter);

import transactionsRouter from './routes/api/transaction.js';
app.use('/api/transaction', transactionsRouter);

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use((req, res) => {
  res.status(404).json({
    message: `Not found - ${req.path}`,
  });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    console.error('Validation error:', error.message);
    return res.status(400).json({
      message: error.message || `Validation failed. Invalid input data.`,
    });
  }
  if (error.name === 'IncorrectCredentials') {
    console.error('Authentication error:', error.message);
    return res.status(401).json({
      message:
        error.message ||
        `Unauthorized. The provided credentials are incorrect.`,
    });
  }
  if (error.name === 'EmailAlreadyTaken') {
    console.error('ConflictEmail:', error.message);
    return res.status(409).json({
      message: error.message || `This email address is already in use.`,
    });
  }
  res.status(500).json({
    message: error.message || `Internal Server Error. Something broke!`,
  });
});

export default app;
