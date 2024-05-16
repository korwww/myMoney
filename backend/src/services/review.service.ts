import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/category.entity';
import {
  createNewReview,
  findReviewById,
  updateReviewData,
  allComments,
  reviewDetails,
  getReviews,
  deleteReviewById,
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
  reviewImgs: string[];
  likes: number;
}

export const getReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
  currentPage,
  limit,
  userId,
}: IReviewQueryParams): Promise<IResponseReview[]> => {
  const reviews = await getReviews({
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
    currentPage,
    limit,
    userId,
  });

  return reviews.map((review) => ({
    id: review.id,
    categoryId: review.categoryId,
    userId: review.userId,
    userName: review.userName,
    title: review.title,
    content: review.content,
    stars: review.stars,
    createdAt: review.createdAt.toISOString(),
    verified: review.verified ? 1 : 0,
    reviewImgs: review.reviewImgs && [],
    likes: review.likes,
  }));
};

const selectBestReviews = () => {};

export const createPagination = async (
  currentPage: number,
  limit: number,
  total: number,
): Promise<IResponsePagination> => {
  const totalCount = Math.ceil(total / limit);

  return { currentPage, totalCount };
};

export const serviceReviewDetails = async (reviewId: number) => {
  const review = await reviewDetails(reviewId);

  if (!review) {
    return null;
  }

  const comments = await allComments(reviewId);

  return {
    ...review,
    comments,
  };
};

export const deleteOne = async (reviewId: number, userId: number) => {
  const result = await deleteReviewById(reviewId, userId);

  return result.affected ? true : false;
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
