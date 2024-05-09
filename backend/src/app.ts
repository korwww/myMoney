import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import { usersRouter } from './routes/users.route';
import { CORS_ALLOWED_ORIGIN } from './settings';

const app: Express = express();

dotenv.config();

app.use(
  cors({
    origin: [CORS_ALLOWED_ORIGIN!, 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.sendStatus(500);
});

export { app };
