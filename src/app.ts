import express from 'express';
import userRoutes from './routes/userRoutes';
import technologiesRoutes from './routes/technologiesRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/technologies', technologiesRoutes);

export default app;
