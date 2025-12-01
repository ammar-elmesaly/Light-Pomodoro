import { RequestHandler } from 'express';
import { Project } from '../models/project';
import { AddProjectHandler } from '../types/handlers';

export const getProjects: RequestHandler = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
}

export const addProject: AddProjectHandler = async (req, res) => {
    const project = await Project.create({ title: req.body.title });
    res.json(project);
}