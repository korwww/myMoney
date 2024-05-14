import { AppDataSource } from '../data-source';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

export const getAllReviews = async (): Promise<Review[]> => {
  return await reviewRepository.find();
};
