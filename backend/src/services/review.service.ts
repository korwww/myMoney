import { IReviewQueryParams } from '../controllers/reviews.controller';
import { Review } from '../entity/reviews.entity';
import { getAllReviews } from '../models/review.model';

export const getReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams): Promise<Review[]> => {
  return await getAllReviews();
};

const selectBestReviews = () => {};

export const makePagination = async () => {
  return { currentPage: 1, totalCount: 3 };
};

const search = () => {};

const getVerifiedReviews = () => {};
