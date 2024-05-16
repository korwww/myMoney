import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';

const likeRepository = AppDataSource.getRepository(Like);

export const addLikeToDB = async (reviewId: number, userId: number) => {
  const existingLike = await likeRepository.findOne({
    where: {
      review: { id: reviewId },
      user: { id: userId },
    },
  });

  if (existingLike) {
    throw new Error('이미 좋아요를 했습니다.');
  }

  const newLike = likeRepository.create({
    review: { id: reviewId },
    user: { id: userId },
  });

  await likeRepository.save(newLike);

  return newLike;
};

export const cancelLikeFromDB = async (reviewId: number, userId: number) => {
  const existingLike = await likeRepository.findOne({
    where: {
      review: { id: reviewId },
      user: { id: userId },
    },
  });

  if (!existingLike) {
    throw new Error('좋아요가 존재하지 않습니다.');
  }

  const result = await likeRepository.remove(existingLike);
  return result;
};
