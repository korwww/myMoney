import { IReviewQueryParams } from '../controllers/reviews.controller';
import { allReviews } from '../models/review.model';

export const serviceAllReviews = async ({
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
