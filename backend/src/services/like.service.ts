import { ERROR_MESSAGE } from '../constance/errorMessage';
import { createLike, deleteLike } from '../models/like.model';
import { ILikeProps } from '../models/like.model';
import { findReviewById } from '../models/review.model';

export const serviceAddLike = async ({ reviewId, userId }: ILikeProps) => {
  const isReview = await findReviewById(reviewId);
  if (!isReview) {
    throw new Error(ERROR_MESSAGE.REVIEW_NOT_FOUND);
  }

  return await createLike({ reviewId, userId });
};

export const serviceCancelLike = async ({ reviewId, userId }: ILikeProps) => {
  return await deleteLike({ reviewId, userId });
};
