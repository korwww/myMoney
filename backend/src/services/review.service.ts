import { ERROR_MESSAGE } from '../constance/errorMessage';
import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/category.entity';
import { allComments } from '../models/comment.model';
import {
  createNewReview,
  findReviewById,
  updateReviewData,
  findReviewDetails,
  getReviews,
  approve,
  deleteReview,
  findUnverifiedReviews,
} from '../models/review.model';
import { findUserById } from '../models/user.model';

const categoryRepository = AppDataSource.getRepository(Category);

export interface IResponsePagination {
  currentPage: number;
  totalCount: number;
}

export interface IResponseReview {
  id: number;
  categoryId: number;
  userId: number;
  userName: string;
  title: string;
  content: string;
  stars: number;
  createdAt: string;
  verified: number;
  reviewImg: string;
  likes: number;
  isMyReview: number;
  isLiked: number;
}

export interface getReviewParams extends IReviewQueryParams {
  userId?: number;
}

export const getReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  myReviews,
  currentPage,
  limit,
  sortBy,
  orderBy,
  userId,
}: getReviewParams): Promise<{
  reviews: IResponseReview[];
  totalCount: number;
}> => {
  let { reviews, totalCount } = await getReviews({
    categoryId,
    isVerified,
    query,
    liked,
    myReviews,
    currentPage,
    limit,
    sortBy,
    orderBy,
    userId,
  });

  reviews = await Promise.all(
    reviews.map(async (review) => ({
      id: review.id,
      categoryId: review.categoryId,
      userId: review.userId,
      userName: review.userName,
      title: review.title,
      content: review.content,
      stars: review.stars,
      createdAt: review.createdAt.toString(),
      verified: review.verified ? 1 : 0,
      reviewImg: review.reviewImg,
      likes: review.likes,
      isMyReview: review.userId === userId ? 1 : 0,
      isLiked: review.isLiked,
    })),
  );
  return { reviews, totalCount };
};

export const createPagination = (
  currentPage: number,
  limit: number,
  total: number,
): IResponsePagination => {
  const totalCount = Math.ceil(total / limit);

  return { currentPage, totalCount };
};

export const serviceReviewDetails = async (
  reviewId: number,
  userId?: number,
) => {
  const review = await findReviewDetails(reviewId, userId);

  review.likes = parseInt(review.likes);
  review.isLiked = review.isLiked > 0 ? true : false;
  review.isAuthor = userId === review.userId;

  let comments = await allComments(reviewId);
  comments = comments.map((comment) => ({
    ...comment,
    isAuthor: userId === comment.userId,
  }));

  return {
    ...review,
    comments,
  };
};

export const serviceDeleteReview = async (reviewId: number, userId: number) => {
  return await deleteReview(reviewId, userId);
};

export const create = async (
  id: number,
  title: string,
  content: string,
  categoryId: number,
  stars: number,
  receiptImg: string,
  reviewImg: string[],
) => {
  const user = await findUserById(id);
  const category = await categoryRepository.findOneBy({ id: categoryId });

  await createNewReview({
    user,
    title,
    content,
    category,
    stars,
    receiptImg,
    reviewImg,
  });
};

export const update = async (
  id: number,
  reviewId: number,
  title: string,
  content: string,
  categoryId: number,
  stars: number,
  receiptImg: string,
  reviewImg: string[],
) => {
  const user = await findUserById(id);
  const category = await categoryRepository.findOneBy({ id: categoryId });

  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  await updateReviewData(review, {
    user,
    title,
    content,
    category,
    stars,
    receiptImg,
    reviewImg,
  });
};

export const approveReview = async (reviewId: number) => {
  return await approve(reviewId);
};

export const serviceGetUnverifiedReviews = async () => {
  return await findUnverifiedReviews();
};
