import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { CustomRequest } from '../middlewares/authentication';

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
