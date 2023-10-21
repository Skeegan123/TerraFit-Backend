import express from 'express';
import './config/database';
import errorHandler from './middlewares/errorHandler';
import logger from './middlewares/logger';

import userRoutes from './routes/userRoutes';
import workoutRoutes from './routes/workoutRoutes';
import friendRoutes from './routes/friendRoutes';

const app = express();
const port = 3000;
app.use(express.json());

app.use(logger); // Log each request

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/friends', friendRoutes);

// This should catch any errors that fall through
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello, TerraFit!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

