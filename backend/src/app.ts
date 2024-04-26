import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.sendStatus(500);
});

export { app };
