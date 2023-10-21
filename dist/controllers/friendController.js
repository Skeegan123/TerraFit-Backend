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
exports.getFriendLeaderboard = exports.unfriendById = exports.getFriendsByUserId = exports.getFriendById = exports.createFriend = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const createFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user1_id, user2_id } = req.body;
    try {
        const query = `
      INSERT INTO friends (user1_id, user2_id) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
        const result = yield pool.query(query, [user1_id, user2_id]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.createFriend = createFriend;
const getFriendById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
      SELECT * FROM friends WHERE friendship_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFriendById = getFriendById;
const getFriendsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
      SELECT * FROM friends WHERE user1_id = $1 OR user2_id = $1;
    `;
        const result = yield pool.query(query, [id]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFriendsByUserId = getFriendsByUserId;
const unfriendById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
            DELETE FROM friends WHERE friendship_id = $1;
        `;
        yield pool.query(query, [id]);
        res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.unfriendById = unfriendById;
const getFriendLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield pool.query(query, [user_id]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getFriendLeaderboard = getFriendLeaderboard;
