// import * as admin from 'firebase-admin';
// import { Request, Response, NextFunction } from 'express';
// import exp from 'constants';

// // Initialize Firebase
// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
//     const idToken = req.headers.authorization?.split('Bearer ')[1];

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(idToken as string);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         res.status(401).send('Unauthorized');
//     }
// };

// export default checkAuth;