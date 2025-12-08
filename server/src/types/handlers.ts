import { RequestHandler } from 'express';
import { EndSessionBody, ProjectBody, SessionBody, PauseSessionBody } from './models';

export type AddProjectHandler = RequestHandler<any, any, ProjectBody>;

export type NewSessionHandler = RequestHandler<any, any, SessionBody>;

export type DeleteHistoryHandler = RequestHandler<any, any, SessionBody>;

export type DeleteProjectHandler = RequestHandler<any, any, SessionBody>;

export type PauseSessionHandler = RequestHandler<any, any, PauseSessionBody>;

export type EndSessionHandler = RequestHandler<any, any, EndSessionBody>;