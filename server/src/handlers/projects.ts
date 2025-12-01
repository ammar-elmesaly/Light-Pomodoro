import { RequestHandler } from 'express';
import { Project } from '../models/project';
import { AddProjectHandler } from '../types/handlers';
import { AppError } from '../types/errors';

export const getProjects: RequestHandler = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
}

export const addProject: AddProjectHandler = async (req, res) => {
    const oldProject = await Project.findOne({title: req.body.title});
    
    if (oldProject)
        throw new AppError('Project already exists', 400);

    const project = await Project.create({ title: req.body.title });
    res.status(201).json(project);
}