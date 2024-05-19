import { ERROR_MESSAGE } from '../constance/errorMessage';
import { AppDataSource } from '../data-source';
import { Comment } from '../entity/comments.entity';

const commentRepository = AppDataSource.getRepository(Comment);

export interface ICommentProps {
  commentId?: number;
  content: string;
  reviewId: number;
  userId: number;
}

export const allComments = async (reviewId: number): Promise<any[]> => {
  const comments = await commentRepository
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.review', 'review')
    .leftJoinAndSelect('comment.user', 'user')
    .select([
      'comment.id AS id',
      'user.id AS userId',
      'user.nickname AS name',
      'comment.content AS content',
      'comment.createdAt AS createdAt',
    ])
    .where('comment.review_id = :reviewId', { reviewId })
    .orderBy('comment.createdAt', 'DESC')
    .getRawMany();

  return comments;
};

export const createComment = async ({
  content,
  reviewId,
  userId,
}: ICommentProps) => {
  const newComment = commentRepository.create({
    user: { id: userId },
    review: { id: reviewId },
    content: content,
  });

  return await commentRepository.save(newComment);
};

export const updateComment = async ({
  commentId,
  content,
  reviewId,
  userId,
}: ICommentProps) => {
  const comment = await commentRepository.findOneBy({
    id: commentId,
    review: { id: reviewId },
    user: { id: userId },
  });

  if (!comment) {
    throw new Error(ERROR_MESSAGE.COMMENT_NOT_FOUND);
  }

  comment.content = content;

  return await commentRepository.save(comment);
};

export const deleteComment = async (commentId: number, userId: number) => {
  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!comment) {
    throw new Error(ERROR_MESSAGE.COMMENT_NOT_FOUND);
  }

  if (comment.user.id !== userId) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }

  await commentRepository.remove(comment);
};
