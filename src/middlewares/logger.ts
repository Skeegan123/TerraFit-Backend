import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, headers, query, body } = req;

    console.log(`[${new Date().toISOString()}] ${method} to ${url}`);
    console.log(`Headers: ${JSON.stringify(headers)}`);
    console.log(`Query: ${JSON.stringify(query)}`);
    // Be cautious logging the entire body, could be sensitive or large data.
    // console.log(`Body: ${JSON.stringify(body)}`);

    // Attach a start time to track duration
    res.locals.startTime = process.hrtime();

    // Hook into the response's 'finish' event
    res.on('finish', () => {
        const duration = process.hrtime(res.locals.startTime);
        const ms = (duration[0] * 1e9 + duration[1]) / 1e6;
        console.log(`Request handled in ${ms.toFixed(2)}ms`);
    });

    next();
};

export default logger;
