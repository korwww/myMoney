import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

export const allReviews = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams): Promise<Review[]> => {
  return await reviewRepository.find();
};
