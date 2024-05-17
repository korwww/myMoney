import { RequestHandler } from 'express';
import { CustomRequest } from '../middlewares/authentication';
import { serviceAddLike, serviceCancelLike } from '../services/like.service';
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
    const reviewId = parseInt(req.params.id);

    await serviceAddLike({ reviewId, userId });

    res.status(201).send({ status: 201, message: 'success' });
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
    const reviewId = parseInt(req.params.id);

    await serviceCancelLike({ reviewId, userId });

    return res.status(200).send({ status: 200, message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
