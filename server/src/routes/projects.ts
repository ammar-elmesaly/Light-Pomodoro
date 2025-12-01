import express from 'express';
import { getProjects, addProject } from '../handlers/projects';

const router = express.Router();

// GET /api/projects
router.get('/', getProjects);

// POST /api/projects
router.post('/', addProject);

export default router;