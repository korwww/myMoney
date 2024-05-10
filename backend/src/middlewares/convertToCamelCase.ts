import { NextFunction, Response } from 'express';
import { CustomRequest } from './authentication';
import camelcaseKeys from 'camelcase-keys';

export const convertToCamelCase = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.body) {
    req.body = camelcaseKeys(req.body, { deep: true });
  }
  next();
};
