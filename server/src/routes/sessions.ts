import express from 'express';
import { endSession, getSessions, newSession } from '../handlers/sessions';

const router = express.Router();

// GET /api/sessions
router.get('/', getSessions);

// POST /api/sessions/start
router.post('/start', newSession);

// POST /api/sessions/end
router.post('/end', endSession);

export default router;

/*
TODO:

POST /api/sessions/pause
POST /api/sessions/resume

*/