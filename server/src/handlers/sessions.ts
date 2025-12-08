import { EndSessionHandler, NewSessionHandler, PauseSessionHandler } from "../types/handlers"
import { Session } from "../models/sessions";
import { RequestHandler } from "express";
import { AppError } from "../types/errors";

export const newSession: NewSessionHandler = async (req, res) => {
    // check if is there an active or paused session (Cannot start 2 active sessions at the same time
    // if there is a session which is not ended (paused or active), it won't start.
    const active = await Session.exists({ status: { $ne: 'ended' } });

    if (active)
        throw new AppError('Cannot start two active sessions at the same time', 400);

    const newSession = await Session.create({
        projectId: req.body.projectId
    });

    res.status(201).json(newSession);
}

export const endSession: EndSessionHandler = async (req, res) => {
    const session = await Session.findOne(
        { _id: req.body.sessionId, status: { $ne: 'ended' } },
    );

    if (!session)
        throw new AppError('Session is not found or ended', 400);

    let totalPause = 0;

    for (const pause of session.pauses) {
        if (!pause.start) continue;

        const start = pause.start;
        const end = pause.end ?? new Date();
        totalPause += new Date(end).getTime() - new Date(start).getTime();
    }
    
    const startTime = session.startTime;
    const endTime = new Date();

    const duration = new Date(endTime).getTime() - new Date(startTime).getTime() - totalPause;

    const updatedSession = await Session.findByIdAndUpdate(session._id, 
        {
            endTime,
            duration,
            status: 'ended'
        },
        { new: true }
    );

    res.json({
        updatedSession
    });
}

export const pauseSession: PauseSessionHandler = async (req, res) => {
    const { sessionId } = req.body;

    const session = await Session.findOneAndUpdate(
        { _id: sessionId, status: 'active' },
        {
            $push: {
                pauses: { start: new Date(), end: null }
            },
            $set: { status: 'paused' }
        },
        { new: true }
    );

    if (!session)
        throw new AppError('Session not found or not active', 400);

    res.json({
        session
    });
};

export const resumeSession: PauseSessionHandler = async (req, res) => {
    const session = await Session.findOneAndUpdate(
        {
            _id: req.body.sessionId,
            status: 'paused',
            "pauses.end": null  // match the currently open pause
        },
        {
            $set: {
                status: 'active',
                'pauses.$.end': new Date()
            }
        },
        { new: true }
    );

    if (!session)
        throw new AppError('Session not found or not paused', 400);

    res.json({
        session
    });
}

export const getSessions: RequestHandler = async (req, res) => {
    const sessions = await Session.find();
    res.json(sessions);
}

export const getActiveSession: RequestHandler = async (req, res) => {
    const session = await Session.findOne({status: 'active'});
    
    if (!session)
        throw new AppError('No active session found.', 404);

    res.json(session);
}

export const getPausedSession: RequestHandler = async (req, res) => {
    const session = await Session.findOne({status: 'paused'});
    
    if (!session)
        throw new AppError('No paused session found.', 404);

    res.json(session);
}

export const getActiveOrPausedSession: RequestHandler = async (req, res) => {
    const session = await Session.findOne({status: { $ne: 'ended' }});
    
    if (!session)
        throw new AppError('No active or paused session found.', 404);

    res.json(session);
}