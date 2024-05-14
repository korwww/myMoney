import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

//데이터베이스와 CRUD
export const allReviews = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams): Promise<Review[]> => {
  return await reviewRepository.find();
};
export const reviewDetails = async (reviewId: number): Promise<any> => {
  const review = await reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.user', 'user')
    .leftJoinAndSelect('review.category', 'category')
    .leftJoinAndSelect('review.likes', 'like')
    .leftJoinAndSelect('review.comments', 'comment')
    .leftJoinAndSelect('comment.user', 'commentUser')
    .select([
      'review.id AS id',
      'category.id AS categoryId',
      'category.name AS cartegoryName',
      'user.id AS userId',
      'user.nickname AS nickname',
      'review.title AS title',
      'review.content AS content',
      'review.stars AS stars',
      'review.createdAt AS createdAt',
      'review.verified AS verified',
      'review.receiptImg AS reviewReceiptImg',
    ])
    .addSelect('COUNT(like.id)', 'likesCount')
    .where('review.id = :reviewId', { reviewId })
    .groupBy('review.id')
    .getRawOne();
  return review;
};

export const allComments = async (reviewId: number): Promise<any[]> => {
  const reviewRepository = AppDataSource.getRepository(Review);
  const comments = await reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.comments', 'comment')
    .leftJoinAndSelect('comment.user', 'user')
    .select([
      'comment.id AS commentId',
      'user.nickname AS commentAuthor',
      'comment.content AS commentContent',
      'comment.createdAt AS commentCreatedAt',
    ])
    .where('review.id = :reviewId', { reviewId })
    .getRawMany();

  return comments;
};
