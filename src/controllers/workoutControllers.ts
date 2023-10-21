import { Request, Response } from 'express';
import { Workout } from '../models/workoutModel';
import { pool } from '../config/database';

export const createWorkout = async (req: Request, res: Response) => {
    const workout: Workout = req.body;

    try {
        const query = `
            INSERT INTO workouts (
                workout_id, user_id, workout_title, estimated_time, required_equipment, plan
            )
            VALUES (
                $1, $2, $3, $4, $5, $6
            )
            RETURNING *;
        `;

        const values = [
            workout.workout_id, workout.user_id, workout.workoutTitle, workout.estimatedTime,
            JSON.stringify(workout.requiredEquipment), JSON.stringify(workout.plan)
        ];


        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


export const getWorkoutById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
      SELECT * FROM workouts WHERE workout_id = $1;
    `;

        const result = await pool.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const updateWorkoutById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { workoutTitle, estimatedTime, requiredEquipment, plan } = req.body as Workout;


    try {
        const query = `
            UPDATE workouts 
            SET workout_title = $1, estimated_time = $2, required_equipment = $3, plan = $4, updated_at = NOW() 
            WHERE workout_id = $5 
            RETURNING *;
        `;

        const values = [workoutTitle, estimatedTime, JSON.stringify(requiredEquipment), JSON.stringify(plan), id];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteWorkoutById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
            DELETE FROM workouts WHERE workout_id = $1;
        `;

        await pool.query(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getWorkoutsByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT * FROM workouts WHERE user_id = $1;
        `;

        await pool.query(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
    try {
        const query = `
      SELECT * FROM workouts;
    `;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const favoriteWorkout = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id } = req.body as Workout;

    try {
        const query = `
      INSERT INTO favorites (user_id, workout_id) 
      VALUES ($1, $2) 
      RETURNING *;
    `;

        const result = await pool.query(query, [user_id, id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const unfavoriteWorkout = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id } = req.body as Workout;

    try {
        const query = `
      DELETE FROM favorites WHERE user_id = $1 AND workout_id = $2;
    `;

        await pool.query(query, [user_id, id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};