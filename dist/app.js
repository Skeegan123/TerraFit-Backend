"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(logger_1.default); // Log each request
app.use(errorHandler_1.default); // Catch all errors
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/workouts', workoutRoutes_1.default);
app.use('/api/friends', friendRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, TerraFit!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
