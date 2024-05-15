import { NextFunction, Response } from 'express';
import { CustomRequest } from '../middlewares/authentication';
import { validationResult } from 'express-validator';

export const validator = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).send(errors.array());
};
