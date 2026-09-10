import express from 'express';
import cors from 'cors';
import allRoutes from './routes';
import mongoose from 'mongoose';
import { globalErrorHandler } from './handlers/globalError';
import { AppError } from './types/errors';

if (!process.env.MONGO_URI) {
  throw new AppError("Please provide MONGO_URI in .env", 500);
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin: [
    'https://light-pomodoro.vercel.app',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(allRoutes);

app.use(globalErrorHandler);

export default app;
