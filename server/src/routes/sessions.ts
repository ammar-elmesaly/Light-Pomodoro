import express from 'express';
import { getSessions, newSession } from '../handlers/sessions';

const router = express.Router();

// GET /api/sessions
router.get('/', getSessions);

// POST /api/sessions/start
router.post('/start', newSession);

export default router;

/*
TODO:

POST /api/sessions/pause
POST /api/sessions/resume
POST /api/sessions/end

*/