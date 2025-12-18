import { RequestHandler } from 'express';
import { Project } from '../models/project';
import { Session } from '../models/sessions';
import { AddProjectHandler, DeleteProjectHandler } from '../types/handlers';
import { AppError } from '../types/errors';

export const getProjects: RequestHandler = async (req, res) => {
    const projects = await Project.find();
    res.json({
        success: true,
        projects
    });
}

export const addProject: AddProjectHandler = async (req, res) => {
    const oldProject = await Project.findOne({title: req.body.title});
    
    if (oldProject)
        throw new AppError('Project already exists', 400);

    const project = await Project.create({ title: req.body.title });
    res.status(201).json({
        success: true,
        ...project.toObject()
    });
}

export const deleteProject: DeleteProjectHandler = async (req, res) => {
    // check if there is an active session in this project first
    const active = await Session.exists({
        status: { $ne: 'ended' },
        projectId: { $eq: req.body.projectId }
    });
    if (active)
        throw new AppError('Cannot delete a project containing an active session.', 400);

    const project = await Project.findByIdAndDelete(req.body.projectId);
    
    if (!project)
        throw new AppError('Project not found.', 404);

    res.json({
        success: true,
        ...project.toObject()
    });
}