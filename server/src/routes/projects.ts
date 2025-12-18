import express from 'express';
import { getProjects, addProject, deleteProject } from '../handlers/projects';

const router = express.Router();

// GET /api/projects
router.get('/', getProjects);

// POST /api/projects/add
router.post('/add', addProject);

// DELETE /api/projects/delete/
router.delete('/delete', deleteProject);

export default router;