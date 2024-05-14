import { IReviewQueryParams } from '../controllers/reviews.controller';
import { allReviews } from '../models/review.model';

export const serviceReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams) => {
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

const makePagenation = () => {};

const search = () => {};

const getVerifiedReviews = () => {};
