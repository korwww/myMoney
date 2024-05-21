import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';
import { reviewRepository } from './review.model';
import { ERROR_MESSAGE } from '../constance/errorMessage';

const likeRepository = AppDataSource.getRepository(Like);

export interface ILikeProps {
  reviewId: number;
  userId: number;
}

export const findReview = async (reviewId: number) => {
  const review = await reviewRepository.findOneBy({
    id: reviewId,
  });

  return review;
};

export const isLike = async ({ reviewId, userId }: ILikeProps) => {
  const existingLike = await likeRepository.findOne({
    where: {
      review: { id: reviewId },
      user: { id: userId },
    },
  });

  return existingLike;
};

export const createLike = async ({ reviewId, userId }: ILikeProps) => {
  const like = await isLike({ reviewId, userId });
  if (like) {
    throw new Error(ERROR_MESSAGE.ALREADY_LIKED);
  }

  const newLike = likeRepository.create({
    review: { id: reviewId },
    user: { id: userId },
  });

  await likeRepository.save(newLike);

  return newLike;
};

export const deleteLike = async ({ reviewId, userId }: ILikeProps) => {
  const like = await isLike({ reviewId, userId });

  if (!like) {
    throw new Error(ERROR_MESSAGE.LIKE_NOT_FOUND);
  }

  const result = await likeRepository.remove(like);
  return result;
};
