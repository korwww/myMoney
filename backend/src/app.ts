import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { QueryError } from 'mysql2';
import 'express-async-errors';
import 'reflect-metadata';
import { CORS_ALLOWED_ORIGIN } from './settings';
import { usersRouter } from './routes/users.route';
import { reviewsRouter } from './routes/reviews.route';
import { ERROR_MESSAGE } from './constance/errorMessage';
import { getStatusCode } from './utils/getStatusCode';
import { commentsRouter } from './routes/comments.route';
import { likeRouter } from './routes/likes.route';

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
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/list', reviewsRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likeRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const errorStatus = getStatusCode((err as Error).message);
  res.status(errorStatus).send({ message: (err as Error).message });
});

export { app };
