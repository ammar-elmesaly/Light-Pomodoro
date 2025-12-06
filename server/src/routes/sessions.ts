import express from 'express';
import {
    endSession,
    getActiveSession,
    getPausedSession,
    getActiveOrPausedSession,
    getSessions,
    newSession,
    pauseSession,
    resumeSession
} from '../handlers/sessions';

const router = express.Router();

// GET /api/sessions
router.get('/', getSessions);

// GET /api/sessions/active
router.get('/active', getActiveSession);

// GET /api/sessions/paused
router.get('/paused', getPausedSession);

// GET /api/sessions/active_or_paused
router.get('/active_or_paused', getActiveOrPausedSession);
// POST /api/sessions/start
router.post('/start', newSession);

// POST /api/sessions/end
router.post('/end', endSession);

// POST /api/sessions/pause
router.post('/pause', pauseSession);

// POST /api/sessions/resume
router.post('/resume', resumeSession);

export default router;