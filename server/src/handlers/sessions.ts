import { NewSessionHandler } from "../types/handlers"
import { Session } from "../models/sessions";
import { RequestHandler } from "express";

export const newSession: NewSessionHandler = async (req, res) => {
    const newSession = await Session.create({
        projectId: req.body.projectId
    });

    res.status(201).json(newSession);
}

export const getSessions: RequestHandler = async (req, res) => {
    const sessions = await Session.find();
    res.json(sessions);
}