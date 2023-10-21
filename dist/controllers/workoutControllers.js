"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfavoriteWorkout = exports.favoriteWorkout = exports.getAllWorkouts = exports.getWorkoutsByUserId = exports.deleteWorkoutById = exports.updateWorkoutById = exports.getWorkoutById = exports.createWorkout = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = req.body;
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
        const result = yield pool.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.createWorkout = createWorkout;
const getWorkoutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
      SELECT * FROM workouts WHERE workout_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getWorkoutById = getWorkoutById;
const updateWorkoutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { workoutTitle, estimatedTime, requiredEquipment, plan } = req.body;
    try {
        const query = `
            UPDATE workouts 
            SET workout_title = $1, estimated_time = $2, required_equipment = $3, plan = $4, updated_at = NOW() 
            WHERE workout_id = $5 
            RETURNING *;
        `;
        const values = [workoutTitle, estimatedTime, JSON.stringify(requiredEquipment), JSON.stringify(plan), id];
        const result = yield pool.query(query, values);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.updateWorkoutById = updateWorkoutById;
const deleteWorkoutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
            DELETE FROM workouts WHERE workout_id = $1;
        `;
        yield pool.query(query, [id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteWorkoutById = deleteWorkoutById;
const getWorkoutsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
            SELECT * FROM workouts WHERE user_id = $1;
        `;
        yield pool.query(query, [id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getWorkoutsByUserId = getWorkoutsByUserId;
const getAllWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT * FROM workouts;
    `;
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getAllWorkouts = getAllWorkouts;
const favoriteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const query = `
      INSERT INTO favorites (user_id, workout_id) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
        const result = yield pool.query(query, [user_id, id]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.favoriteWorkout = favoriteWorkout;
const unfavoriteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const query = `
      DELETE FROM favorites WHERE user_id = $1 AND workout_id = $2;
    `;
        yield pool.query(query, [user_id, id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.unfavoriteWorkout = unfavoriteWorkout;
