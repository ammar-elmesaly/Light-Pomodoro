import express from 'express';
import allRoutes from './routes';
import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
    throw Error("Please provide MONGO_URI in .env");
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(allRoutes);

export default app;