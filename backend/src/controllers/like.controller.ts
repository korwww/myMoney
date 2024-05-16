import { RequestHandler } from 'express';
import { CustomRequest } from '../middlewares/authentication';
import { like, unlike } from '../services/like.service';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export const addLike: RequestHandler<{ id: string }> = async (
  req: CustomRequest,
  res,
) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  try {
    const userId = req.user.id;
    const reviewId = Number(req.params.id);

    const likeResult = await like(reviewId, userId);
    if (likeResult) return res.status(201).send('좋아요 추가');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const cancelLike: RequestHandler = async (req: CustomRequest, res) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  try {
    const userId = req.user.id;
    const reviewId = Number(req.params.id);

    await unlike(reviewId, userId);

    return res.status(200).send('좋아요 삭제');
  } catch (error: any) {
    throw new Error(error.message);
  }
};
