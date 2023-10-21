import express from 'express';
import * as workoutController from '../controllers/workoutControllers';
// import authMiddleware from '../middlewares/authMiddleware';
import exp from 'constants';

const router = express.Router();

// router.use(authMiddleware);

// Create a new workout
router.post('/', workoutController.createWorkout);

// Get workout by id
router.get('/:id', workoutController.getWorkoutById);

// Update workout by id
router.patch('/:id', workoutController.updateWorkoutById);

// Delete workout by id
router.delete('/:id', workoutController.deleteWorkoutById);

// Get all workouts
router.get('/', workoutController.getAllWorkouts);

// Get all workouts by user id
router.get('/user/:user_id', workoutController.getWorkoutsByUserId);

// Favorite a workout
router.get('/user/:user_id/:workout_id', workoutController.favoriteWorkout);

// Unfavorite a workout
router.delete('/user/:user_id/:workout_id', workoutController.unfavoriteWorkout);

export default router;