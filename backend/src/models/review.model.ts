import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

//데이터베이스와 CRUD
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
