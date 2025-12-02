import { EndSessionHandler, NewSessionHandler } from "../types/handlers"
import { Session } from "../models/sessions";
import { RequestHandler } from "express";
import { AppError } from "../types/errors";

export const newSession: NewSessionHandler = async (req, res) => {
    const newSession = await Session.create({
        projectId: req.body.projectId
    });

    res.status(201).json(newSession);
}

export const endSession: EndSessionHandler = async (req, res) => {

    const session = await Session.findById(req.body.sessionId);

    if (!session)
        throw new AppError('Session is not found', 404);

    const start = new Date(session.startTime).getTime();
    const end = new Date(req.body.endTime).getTime();

    const duration = end - start;  // duration in ms

    await Session.findOneAndUpdate({_id: req.body.sessionId}, {
        endTime: req.body.endTime,
        status: 'ended',
        duration
    });

    res.json({ message: 'ended the session successfully' });
}

export const getSessions: RequestHandler = async (req, res) => {
    const sessions = await Session.find();
    res.json(sessions);
}