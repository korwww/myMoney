import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';
import { ReviewImg } from '../entity/review_img.entity';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

export const getReviews = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
  currentPage = 1,
  limit,
}: {
  categoryId?: number;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
  currentPage?: number;
  limit?: number;
}): Promise<Review[]> => {
  const queryBuilder = reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.user', 'user')
    .leftJoinAndSelect('review.reviewImgs', 'review_img')
    .loadRelationCountAndMap('review.likes', 'review.likes', 'likes')
    .select([
      'review.id AS id',
      'review.category_id AS categoryId',
      'user.id AS userId',
      'user.nickname AS userName',
      'review.title AS title',
      'review.content AS content',
      'review.stars AS stars',
      'review.createdAt AS createdAt',
      'review.verified AS verified',
    ])
    .addSelect((subQuery) => {
      return subQuery
        .select('img.image', 'image')
        .from(ReviewImg, 'img')
        .where('img.reviewId = review.id');
    }, 'reviewImg')
    .addSelect((subQuery) => {
      return subQuery
        .select('COUNT(like.id)', 'likes')
        .from(Like, 'like')
        .where('like.reviewId = review.id');
    }, 'likes');

  if (categoryId) {
    queryBuilder.andWhere('reviews.category_id = :categoryId', { categoryId });
  }

  if (isVerified !== undefined) {
    const verifiedValue = isVerified ? 1 : 0;
    queryBuilder.andWhere('reviews.verified = :isVerified', { verifiedValue });
  }

  // if (liked) {
  //   queryBuilder
  //     .innerJoin('review.likes', 'like')
  //     .andWhere('like.user_id = :userId', { userId: 로그인한 유저 id });
  // }

  if (best) {
    queryBuilder.orderBy('likes', 'DESC').take(3);
  }

  // if (myReviews) {
  //   queryBuilder.andWhere('review.user_id = :userId', { userId: 로그인한 유저 id });
  // }

  if (query) {
    queryBuilder.andWhere(
      'reviews.title LIKE :query OR review.content LIKE :query',
      { query: `%${query}%` },
    );
  }

  if (limit) {
    queryBuilder.take(limit);
  }

  if (currentPage && limit) {
    queryBuilder.skip((currentPage - 1) * limit);
  }

  return await queryBuilder.getMany();
};
