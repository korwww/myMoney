import { addLikeToDB, cancelLikeFromDB } from '../models/like.model';

export const like = async (reviewId: number, userId: number) => {
  const result = await addLikeToDB(reviewId, userId);
  return result;
};

export const unlike = async (reviewId: number, userId: number) => {
  const result = await cancelLikeFromDB(reviewId, userId);
  return result;
};
