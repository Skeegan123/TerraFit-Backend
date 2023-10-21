import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
    customMessage?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.customMessage || 'An internal error occurred. Please try again later.';

    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    console.error(err.stack);

    res.status(statusCode).json({
        error: message,
        // Add more metadata if necessary
    });
};

export default errorHandler;
