"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isCloudEnvironment = process.env.NODE_ENV === 'production';
// const poolConfig = isCloudEnvironment ? {
//     host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: Number(process.env.DB_PORT),
// } : {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: Number(process.env.DB_PORT),
// };
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
};
exports.pool = new pg_1.Pool(poolConfig);
exports.pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error: ", err));
