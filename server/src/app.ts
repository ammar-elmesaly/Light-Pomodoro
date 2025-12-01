import express from 'express';
import allRoutes from './routes';
import mongoose from 'mongoose';
import { globalErrorHandler } from './handlers/globalError';
import { AppError } from './types/errors';

if (!process.env.MONGO_URI) {
    throw new AppError("Please provide MONGO_URI in .env", 500);
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(allRoutes);

app.use(globalErrorHandler);

export default app;