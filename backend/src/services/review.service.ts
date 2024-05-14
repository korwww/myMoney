import { IReviewQueryParams } from '../controllers/reviews.controller';
import { Review } from '../entity/reviews.entity';
import { allReviews } from '../models/review.model';

export const serviceReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams): Promise<Review[]> => {
  return await allReviews({
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
  });
};

const selectBestReviews = () => {};

export const makePagination = async () => {
  return { currentPage: 1, totalCount: 3 };
};

const search = () => {};

const getVerifiedReviews = () => {};
