import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { ReviewImg } from '../entity/review_img.entity';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);
const reviewImgRepository = AppDataSource.getRepository(ReviewImg);


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




export const createNewReview = async (reviewData: {
  user: any,
  title: string,
  content: string,
  category: any,
  stars: number,
  receiptImg: string,
  reviewImg: string[]
}) => {
  const { user, title, content, category, stars, receiptImg, reviewImg } = reviewData;

  try {
    const review = new Review();
    review.title = title;
    review.content = content;
    review.category = category;
    review.stars = stars;
    review.receiptImg = receiptImg;
    review.user = user;

    await reviewRepository.save(review);

    const savedReviewImages = [];
    for (const image of reviewImg) {
      const reviewImg = new ReviewImg();
      reviewImg.review = review;
      reviewImg.image = image;
      const savedImage = await reviewImgRepository.save(reviewImg);
      savedReviewImages.push(savedImage);
    }
  
    return {review, reviewImg: savedReviewImages};
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
};

