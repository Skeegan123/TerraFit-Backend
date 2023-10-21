// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';

// export const getUserInfo = async (req: Request, res: Response) => {
//     try {
//         const userInfo = await admin.auth().getUser((req.user as admin.auth.DecodedIdToken).uid);
//         res.status(200).json(userInfo);
//     } catch (error) {
//         res.status(400).send('User not found');
//     }
// };
