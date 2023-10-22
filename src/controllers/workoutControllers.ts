import { Request, Response } from 'express';
import { Workout } from '../models/workoutModel';
import { pool } from '../config/database';
import OpenAI from "openai";

export const createWorkout = async (req: Request, res: Response) => {

    const { level, focus, user_id } = req.body;

    console.log("Level: " + level);
    console.log("Focus: " + focus);

    // ChatGPT API implementation

    try {
        const openai = new OpenAI({ "apiKey": process.env.OPENAI_API_KEY });

        const completion: any = await openai.chat.completions.create({
            messages: [
                // { role: "system", content: "You are an AI program designed to create workout plans for people based on a variety of factors. You will receive a message in the form of \"LEVEL: BEGINNER; FOCUS: EVERYTHING;\" And respond with an array of 3 workout plans of different lengths of time. These workout plans will be in pure JSON and each object in the array will follow the format of the following JSON: { workoutTitle: \"Creative title for a workout\", estimatedTime: \"45 minutes\" requiredEquipment: [ \"Bench Press\", \"Dumbells\", \"Squat Rack\", ], plan: [ { title: \"Bicep Curls\", sets: 3, reps: 10, equipment: \"Dumbells\", notes: \"\", }, { title: \"Bench Press\", sets: 3, reps: 5, equipment: \"Bench Press\", notes: \"\", }, { title: \"Plank\", time: \"1 minute\" equipment: \"None\", notes: \"\", }, ] } You will only choose exercises from the following list of exercises as these are the only ones we support at this time: Squats, Deadlifts, Bench Press, Push-ups, Planks, Overhead Press, Pull-ups, Lunges, Bent-over Rows, Dumbbell Curls, Tricep Extensions, Burpees, Leg Press, Mountain Climbers, Lat Pulldowns, Seated Rows, Jumping Jacks, Sit-ups, Bicycle Crunches, Kettlebell Swings, Romanian Deadlifts, Chin-ups, Dumbbell Flyes, Calf Raises, Skull Crushers, Russian Twists, Box Jumps" },
                { role: "system", content: "You are an AI program designed to create workout plans for people based on a variety of factors. You will receive a message in the form of \"user_id: 1; LEVEL: BEGINNER; FOCUS: EVERYTHING;\" And respond with pure JSON in the form of: { user_id: 1, workoutTitle: \"Creative title for a workout\", estimatedTime: \"45 minutes\" requiredEquipment: [ \"Bench Press\", \"Dumbells\", \"Squat Rack\", ], plan: [ { title: \"Bicep Curls\", sets: 3, reps: 10, equipment: \"Dumbells\", notes: \"\", }, { title: \"Bench Press\", sets: 3, reps: 5, equipment: \"Bench Press\", notes: \"\", }, { title: \"Plank\", time: \"1 minute\" equipment: \"None\", notes: \"\", }, ] } You will only choose exercises from the following list of exercises as these are the only ones we support at this time: Squats, Deadlifts, Bench Press, Push-ups, Planks, Overhead Press, Pull-ups, Lunges, Bent-over Rows, Dumbbell Curls, Tricep Extensions, Burpees, Leg Press, Mountain Climbers, Lat Pulldowns, Seated Rows, Jumping Jacks, Sit-ups, Bicycle Crunches, Kettlebell Swings, Romanian Deadlifts, Chin-ups, Dumbbell Flyes, Calf Raises, Skull Crushers, Russian Twists, Box Jumps" },
                { role: "user", content: `user_id: ${user_id}, LEVEL: ${level}; FOCUS: ${focus};` }],
            model: "gpt-4",
        });

        console.log(completion.choices[0].message.content);

        // convert string to JSON
        const json = JSON.parse(completion.choices[0].message.content);

        console.log(json);
        console.log(json.user_id);

        // Workout creation
        const workout = json as Workout;


        try {
            const query = `
                INSERT INTO workouts (
                    user_id, workout_title, estimated_time, required_equipment, plan
                )
                VALUES (
                    $1, $2, $3, $4, $5
                )
                RETURNING *;
            `;

            const values = [
                workout.user_id, workout.workoutTitle, workout.estimatedTime,
                JSON.stringify(workout.requiredEquipment), JSON.stringify(workout.plan)
            ];


            const result = await pool.query(query, values);
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
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