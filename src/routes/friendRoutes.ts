import express from 'express';
import * as friendController from '../controllers/friendController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// router.use(authMiddleware);

// Create a new friend
router.post('/new', friendController.createFriend);

// Get friend by id
router.get('/:id', friendController.getFriendById);

// Get all friends by user id
router.get('/user/:id', friendController.getFriendsByUserId);

// Unfriend by id
router.delete('/:id', friendController.unfriendById);

// Unfriend by user id
router.delete('/user/:id', friendController.unfriendByUserId);

// Get friend leaderboard
router.get('/leaderboard/:user_id', friendController.getFriendLeaderboard);

export default router;