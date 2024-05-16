import { IReviewQueryParams } from '../controllers/reviews.controller';
import { getReviews } from '../models/review.model';

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
  reviewImg: string[];
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
    categoryId: review.category.id,
    userId: review.user.id,
    userName: review.user.nickname,
    title: review.title,
    content: review.content,
    stars: review.stars,
    createdAt: review.createdAt.toISOString(),
    verified: review.verified ? 1 : 0,
    reviewImg: review.reviewImg ? review.reviewImg.map((img) => img.image) : [],
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
