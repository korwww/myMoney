import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/authentication';
import {
  serviceCreateComment,
  serviceDeleteComment,
  serviceUpdateComment,
} from '../services/comment.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const addComment = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  const userId = req.user.id;
  const { reviewId, content } = req.body;

  await serviceCreateComment({ content, reviewId, userId });
  res.status(201).send({ status: 201, message: 'Created' });
  try {
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editComment = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  const commentId = parseInt(req.params.id);
  const userId = req.user.id;
  const { reviewId, content } = req.body;

  try {
    await serviceUpdateComment({ commentId, userId, reviewId, content });

    res.status(200).send({ status: 200, message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeComment = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  const userId = req.user.id;
  const commentId = parseInt(req.params.id);

  try {
    await serviceDeleteComment(commentId, userId);
    res.status(200).send({ status: 200, message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
