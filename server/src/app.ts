import express from 'express';
import allRoutes from './routes';

const app = express();

app.use(allRoutes);

export default app;