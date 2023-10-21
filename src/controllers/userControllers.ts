import { Request, Response } from 'express';
import { User } from '../models/userModel';  // Your existing User interface
import { pool } from '../config/database';

export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    try {
        const query = `INSERT INTO users (username, email, created_at, updated_at) 
          VALUES ($1, $2, NOW(), NOW()) 
          RETURNING *;
        `;

        const result = await pool.query(query, [username, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
      SELECT * FROM users WHERE user_id = $1;
    `;

        const result = await pool.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body as User;

    try {
        const query = `
      UPDATE users 
      SET username = $1, email = $2, updated_at = NOW() 
      WHERE user_id = $3 
      RETURNING *;
    `;

        const result = await pool.query(query, [username, email, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
      DELETE FROM users WHERE user_id = $1;
    `;

        await pool.query(query, [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const query = `
      SELECT * FROM users;
    `;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getFavoritesByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `
        SELECT * FROM favorites WHERE user_id = $1;
    `;

        const result = await pool.query(query, [id]);
        res.json(result.rows);
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

        const result = await pool.query(query, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
