import express from 'express';
import * as userController from '../controllers/userControllers';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// router.use(authMiddleware);

// Create a new user (Sign up)
router.post('/new', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by id
router.get('/:id', userController.getUserById);

// Update user by id
router.patch('/:id', userController.updateUserById);

// Delete user by id
router.delete('/:id', userController.deleteUserById);

export default router;
