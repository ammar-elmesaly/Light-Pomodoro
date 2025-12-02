import { RequestHandler } from 'express';
import { EndSessionBody, ProjectBody, SessionBody } from './models';

export type AddProjectHandler = RequestHandler<any, any, ProjectBody>;

export type NewSessionHandler = RequestHandler<any, any, SessionBody>;

export type EndSessionHandler = RequestHandler<any, any, EndSessionBody>;