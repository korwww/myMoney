import { AppDataSource } from '../data-source';
import { Like } from '../entity/likes.entity';
import { ReviewImg } from '../entity/review_img.entity';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);
const likeRepository = AppDataSource.getRepository(Like);
const reviewImgRepository = AppDataSource.getRepository(ReviewImg);

export const getAllReviews = async (): Promise<Review[]> => {
  return await reviewRepository.find();
};

export const countReviewLikes = async (reviewId: number): Promise<number> => {
  const likeCount: number = await likeRepository.count({
    where: {
      review: { id: reviewId },
    },
  });
  return likeCount;
};

export const getReviewImages = async (reviewId: number): Promise<string[]> => {
  const reviewImages: ReviewImg[] = await reviewImgRepository.find({
    where: {
      review: { id: reviewId },
    },
  });
  return reviewImages.map((img) => img.image);
};

export const countAllReviews = async (): Promise<number> => {
  return await reviewRepository.count();
};
