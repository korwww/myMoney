import { IReviewQueryParams } from '../controllers/reviews.controller';
import { Review } from '../entity/reviews.entity';
import { countAllReviews, getAllReviews } from '../models/review.model';

export interface IPagination {
  currentPage: number;
  totalCount: number;
}

export interface IResponseReview extends Review {
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
}: IReviewQueryParams): Promise<IResponseReview[]> => {
  return (await getAllReviews()) as IResponseReview[];
};

const selectBestReviews = () => {};

export const createPagination = async (currentPage: number) => {
  const totalCount = await countAllReviews();
  return { currentPage, totalCount };
};

const search = () => {};

const getVerifiedReviews = () => {};
