import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'database_name',
    port: Number(process.env.DB_PORT || 5432),
    // Optionally, add more pool settings here
};

export const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
})

// Optional: you might remove this since the pool will handle connections internally
pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL")
        // pool.query('SELECT * FROM users', (err, res) => {
        //     console.log(err, res)
        // })
    }
    )
    .catch(err => console.error("Connection error: ", err));
