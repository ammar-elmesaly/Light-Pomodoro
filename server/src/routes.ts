import express from 'express';
import sessionsRouter from './routes/sessions';
import projectsRouter from './routes/projects';

const router = express.Router();

router.use('/api/sessions', sessionsRouter);
router.use('/api/projects', projectsRouter);

export default router;