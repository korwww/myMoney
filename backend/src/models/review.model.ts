import { ERROR_MESSAGE } from '../constance/errorMessage';
import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';
import { ReviewImg } from '../entity/review_img.entity';
import { Review } from '../entity/reviews.entity';
import { IResponseReview, getReviewParams } from '../services/review.service';

export const reviewRepository = AppDataSource.getRepository(Review);
const reviewImgRepository = AppDataSource.getRepository(ReviewImg);

export const getReviews = async ({
  categoryId,
  isVerified,
  query,
  liked,
  myReviews,
  currentPage = 1,
  limit,
  sortBy,
  orderBy,
  userId,
}: getReviewParams): Promise<{
  reviews: IResponseReview[];
  totalCount: number;
}> => {
  const queryBuilder = reviewRepository
    .createQueryBuilder('reviews')
    .leftJoinAndSelect('reviews.user', 'user')
    .loadRelationCountAndMap('reviews.likes', 'reviews.likes', 'likes')
    .select([
      'reviews.id AS id',
      'reviews.category_id AS categoryId',
      'user.id AS userId',
      'user.nickname AS userName',
      'reviews.title AS title',
      'reviews.content AS content',
      'reviews.stars AS stars',
      'reviews.createdAt AS createdAt',
      'reviews.verified AS verified',
    ])
    .addSelect(
      (subQuery) =>
        subQuery
          .select('image', 'image')
          .from(ReviewImg, 'review_img')
          .where('review_img.review_id = reviews.id')
          .orderBy('review_img.id', 'ASC')
          .limit(1),
      'reviewImg',
    )
    .addSelect((subQuery) => {
      return subQuery
        .select('COUNT(like.id)', 'likes')
        .from(Like, 'like')
        .where('like.review_id = reviews.id');
    }, 'likes');

  if (userId) {
    queryBuilder.addSelect((subQuery) => {
      return subQuery
        .select('COUNT(`like`.`id`) > 0', 'isLiked')
        .from(Like, 'like')
        .where('like.review_id = reviews.id AND like.user_id = :userId', {
          userId,
        });
    }, 'isLiked');
  }

  if (categoryId) {
    queryBuilder.andWhere('reviews.category_id = :categoryId', {
      categoryId,
    });
  }

  if (isVerified !== undefined) {
    queryBuilder.andWhere('reviews.verified = :isVerified', {
      isVerified,
    });
  }

  if (liked) {
    queryBuilder
      .innerJoin('reviews.likes', 'like')
      .andWhere('like.user_id = :userId', { userId });
  }

  if (sortBy && orderBy) {
    queryBuilder.orderBy(sortBy, orderBy as 'ASC' | 'DESC');
  }

  if (myReviews) {
    queryBuilder.andWhere('reviews.user_id = :userId', { userId });
  }

  if (query) {
    queryBuilder.andWhere(
      'reviews.title LIKE :query OR reviews.content LIKE :query',
      { query: `%${query.replace(/'/g, '')}%` },
    );
  }

  if (currentPage && limit) {
    queryBuilder.offset((currentPage - 1) * limit);
  }

  if (limit) {
    queryBuilder.limit(limit);
  }

  const totalCount = await queryBuilder.getCount();

  const reviews: IResponseReview[] =
    await queryBuilder.getRawMany<IResponseReview>();

  return { reviews, totalCount };
};

export const getReviewImages = async (reviewId: number): Promise<string[]> => {
  const images = await reviewImgRepository.find({
    where: { review: { id: reviewId } },
    select: ['image'],
  });
  return images.map((img) => img.image);
};

export const findReviewDetails = async (
  reviewId: number,
  userId?: number,
): Promise<any> => {
  let review = await reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.user', 'user')
    .leftJoinAndSelect('review.category', 'category')
    .leftJoinAndSelect('review.likes', 'like')
    .leftJoinAndSelect('review.reviewImgs', 'reviewImg')
    .select([
      'review.id AS id',
      'category.id AS categoryId',
      'category.name AS categoryName',
      'user.id AS userId',
      'user.nickname AS name',
      'review.title AS title',
      'review.content AS content',
      'review.stars AS stars',
      'review.createdAt AS createdAt',
      'review.verified AS verified',
      'review.receiptImg AS receiptImg',
    ])
    .addSelect((subQuery) => {
      return subQuery
        .select('COUNT(like.id)', 'likes')
        .from(Like, 'like')
        .where('like.review_id = review.id');
    }, 'likes')
    .addSelect((subQuery) => {
      return subQuery
        .select('COUNT(`like`.`id`) > 0', 'isLiked')
        .from(Like, 'like')
        .where('like.review_id = review.id AND like.user_id = :userId', {
          userId,
        });
    }, 'isLiked')
    .where('review.id = :reviewId', { reviewId })
    .groupBy('review.id')
    .getRawOne();

  if (!review) {
    throw new Error(ERROR_MESSAGE.REVIEW_NOT_FOUND);
  }

  review.reviewImg = await getReviewImages(reviewId);

  return review;
};

export const deleteReview = async (reviewId: number, userId: number) => {
  const review = await reviewRepository.findOne({
    where: {
      id: reviewId,
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!review) {
    throw new Error(ERROR_MESSAGE.REVIEW_NOT_FOUND);
  }

  const result = await reviewRepository
    .createQueryBuilder()
    .delete()
    .from(Review)
    .where('id = :reviewId', { reviewId })
    .andWhere('user_id = :userId', { userId })
    .execute();

  return result;
};

export const findReviewById = async (id: number) => {
  return await reviewRepository.findOneBy({ id });
};

export const createNewReview = async (reviewData: {
  user: any;
  title: string;
  content: string;
  category: any;
  stars: number;
  receiptImg: string;
  reviewImg: string[];
}) => {
  const { user, title, content, category, stars, receiptImg, reviewImg } =
    reviewData;

  try {
    const review = new Review();
    review.title = title;
    review.content = content;
    review.category = category;
    review.stars = stars;
    review.receiptImg = receiptImg;
    review.user = user;

    await reviewRepository.save(review);

    const savedReviewImages = await saveReviewImages(review, reviewImg);

    return { review, reviewImg: savedReviewImages };
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
};

export const updateReviewData = async (
  review: Review,
  updateData: {
    user: any;
    title: string;
    content: string;
    category: any;
    stars: number;
    receiptImg: string;
    reviewImg: string[];
  },
) => {
  const { user, title, content, category, stars, receiptImg, reviewImg } =
    updateData;

  review.title = title;
  review.content = content;
  review.category = category;
  review.stars = stars;
  review.receiptImg = receiptImg;
  review.user = user;

  await reviewRepository.save(review);

  await updateReviewImages(review, reviewImg);
};

const saveReviewImages = async (review: Review, reviewImg: string[]) => {
  const savedReviewImages = [];
  for (const image of reviewImg) {
    const reviewImgInstance = new ReviewImg();
    reviewImgInstance.review = review;
    reviewImgInstance.image = image;
    const savedImage = await reviewImgRepository.save(reviewImgInstance);
    savedReviewImages.push(savedImage);
  }
  return savedReviewImages;
};

const updateReviewImages = async (review: Review, reviewImg: string[]) => {
  await reviewImgRepository.delete({ review });
  await saveReviewImages(review, reviewImg);
};

// 미인증 후기 인증처리하기
export const approve = async (reviewId: number) => {
  let review = await reviewRepository.findOneBy({ id: reviewId });
  if (!review) {
    throw new Error(ERROR_MESSAGE.INVALID_DATA);
  }

  review.verified = true;
  return await reviewRepository.save(review);
};

// 미인증 후기 목록 조회
export const findUnverifiedReviews = async () => {
  const reviews = await reviewRepository
    .createQueryBuilder('reviews')
    .leftJoinAndSelect('reviews.user', 'user')
    .select([
      'reviews.id AS id',
      'reviews.title AS title',
      'reviews.createdAt AS createdAt',
      'reviews.receiptImg AS receiptImg',
      'user.id AS userId',
      'user.nickname AS userName',
    ])
    .where('reviews.verified = false')
    .getRawMany();

  return reviews;
};
