import { RequestHandler } from 'express';
import { ProjectBody, SessionBody } from './models';

export type AddProjectHandler = RequestHandler<any, any, ProjectBody>;

export type NewSessionHandler = RequestHandler<any, any, SessionBody>;