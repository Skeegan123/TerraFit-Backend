import { NextFunction, Request, Response } from 'express';
import { Friend } from '../models/friendModal';  // Your existing User interface
import { pool } from '../config/database';

export const createFriend = async (req: Request, res: Response) => {
    const { user1_id, user2_id } = req.body as Friend;

    try {
        const query = `
      INSERT INTO friends (user1_id, user2_id) 
      VALUES ($1, $2) 
      RETURNING *;
    `;

        const result = await pool.query(query, [user1_id, user2_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getFriendById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
      SELECT * FROM friends WHERE friendship_id = $1;
    `;

        const result = await pool.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getFriendsByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
      SELECT * FROM friends WHERE user1_id = $1 OR user2_id = $1;
    `;

        const result = await pool.query(query, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const unfriendById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
            DELETE FROM friends WHERE friendship_id = $1;
        `;

        await pool.query(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const unfriendByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
            DELETE FROM friends WHERE user1_id = $1 OR user2_id = $1;
        `;

        await pool.query(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getFriendLeaderboard = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const query = `
            SELECT users.username, users.completed_workouts
            FROM users
            JOIN friends ON users.user_id = friends.friend_id
            WHERE friends.user_id = $1
            ORDER BY users.completed_workouts DESC
            LIMIT 10;
        `;

        const result = await pool.query(query, [user_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};