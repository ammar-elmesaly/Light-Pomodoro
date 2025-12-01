import { RequestHandler } from 'express';
import { ProjectBody } from './models';

export type AddProjectHandler = RequestHandler<any, any, ProjectBody>;