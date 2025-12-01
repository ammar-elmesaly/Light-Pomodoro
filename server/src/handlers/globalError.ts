import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        success: false,
        error: error.message
    });
}