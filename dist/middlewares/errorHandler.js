"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.customMessage || 'An internal error occurred. Please try again later.';
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    console.error(err.stack);
    res.status(statusCode).json({
        error: message,
        // Add more metadata if necessary
    });
};
exports.default = errorHandler;
