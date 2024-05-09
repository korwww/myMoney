import { RequestHandler } from 'express';

export const getReviews: RequestHandler = (req, res) => {
  const re = req;
  return res.status(200).json({ message: 'success' });
};
