import { ERROR_MESSAGE } from '../constance/errorMessage';
import { createLike, deleteLike, findReview } from '../models/like.model';
import { ILikeProps } from '../models/like.model';

export const serviceAddLike = async ({ reviewId, userId }: ILikeProps) => {
  const isReview = await findReview(reviewId);
  if (!isReview) {
    throw new Error(ERROR_MESSAGE.REVIEW_NOT_FOUND);
  }

  const result = await createLike({ reviewId, userId });
  return result;
};

export const serviceCancelLike = async ({ reviewId, userId }: ILikeProps) => {
  const result = await deleteLike({ reviewId, userId });
  return result;
};
