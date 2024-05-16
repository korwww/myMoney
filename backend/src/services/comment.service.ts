import { ERROR_MESSAGE } from '../constance/errorMessage';
import { findReviewById } from '../models/review.model';
import {
  ICommentProps,
  createComment,
  deleteComment,
  updateComment,
} from './../models/comment.model';

export const serviceCreateComment = async ({
  content,
  reviewId,
  userId,
}: ICommentProps) => {
  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error(ERROR_MESSAGE.REVIEW_NOT_FOUND);
  }

  return await createComment({ content, reviewId, userId });
};

export const serviceUpdateComment = async ({
  commentId,
  content,
  reviewId,
  userId,
}: ICommentProps) => {
  return await updateComment({ commentId, content, reviewId, userId });
};

export const serviceDeleteComment = async (
  commentId: number,
  userId: number,
) => {
  return await deleteComment(commentId, userId);
};
