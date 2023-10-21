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
exports.getWorkoutsByUserId = exports.getFavoritesByUserId = exports.getAllUsers = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        const query = `INSERT INTO users (username, email, created_at, updated_at) 
      VALUES ($1, $2, NOW(), NOW()) 
      RETURNING *;
    `;
        const result = yield pool.query(query, [username, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
      SELECT * FROM users WHERE user_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const query = `
      UPDATE users 
      SET username = $1, email = $2, updated_at = NOW() 
      WHERE user_id = $3 
      RETURNING *;
    `;
        const result = yield pool.query(query, [username, email, id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
      DELETE FROM users WHERE user_id = $1;
    `;
        yield pool.query(query, [id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteUserById = deleteUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT * FROM users;
    `;
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getAllUsers = getAllUsers;
const getFavoritesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT * FROM favorites WHERE user_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFavoritesByUserId = getFavoritesByUserId;
const getWorkoutsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT * FROM workouts WHERE user_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getWorkoutsByUserId = getWorkoutsByUserId;
