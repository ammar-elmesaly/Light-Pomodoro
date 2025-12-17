import { RequestHandler } from 'express';
import {
    CreateProjectInput,
    StartSessionInput,
    EndSessionInput,
    PauseSessionInput,
    DeleteProjectInput,
    DeleteHistoryInput
} from './dtos';

export type AddProjectHandler =
    RequestHandler<any, any, CreateProjectInput>;

export type NewSessionHandler =
    RequestHandler<any, any, StartSessionInput>;

export type EndSessionHandler =
    RequestHandler<any, any, EndSessionInput>;

export type PauseSessionHandler =
    RequestHandler<any, any, PauseSessionInput>;

export type DeleteProjectHandler =
    RequestHandler<any, any, DeleteProjectInput>;

export type DeleteHistoryHandler =
    RequestHandler<any, any, DeleteHistoryInput>;
