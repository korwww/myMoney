import { RequestHandler } from 'express';
import { serviceReviewList } from '../services/review.service';
import { CustomRequest } from '../middlewares/authentication';
import { Review } from '../entity/reviews.entity';
import { getRepository } from 'typeorm';
import { User } from '../entity/users.entity';
import { ReviewImg } from '../entity/review_img.entity';
import {Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/category.entity';


export interface IReviewQueryParams {
  categoryId?: string;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
}
//request, response를 담당
export const getReviews: RequestHandler<{}, {}, {}, IReviewQueryParams> = (
  req,
  res,
) => {
  const { categoryId, isVerified, query, liked, best, myReviews } = req.query;
  try {
    serviceReviewList({
      categoryId,
      isVerified,
      query,
      liked,
      best,
      myReviews,
    }).then(
      (responseData) => {
        return res
          .status(200)
          .json({ reviews: responseData, pagination: 'pagenation' });
      },
      (err) => {
        throw err;
      },
    );
  } catch (err) {
    //공통 에러 핸들러 필요
    console.log(err);
    return res.status(500).json({ message: '오류' });
  }
};




export const createReview = async (req: CustomRequest, res: Response) => {
  try {
    const { userId, title, content, categoryId, stars, receiptImg, reviewImages } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const reviewRepository = AppDataSource.getRepository(Review);
    const reviewImgRepository = AppDataSource.getRepository(ReviewImg);
    const categoryRepository = AppDataSource.getRepository(Category);

    //쿠키에서 커내오도록 변경해야 함
    const user = await userRepository.findOneBy({ id: userId });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const category = await categoryRepository.findOneBy({ id: categoryId });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // 새 리뷰 생성
    const review = new Review();
    review.title = title;
    review.content = content;
    review.stars = stars;
    review.receiptImg = receiptImg;
    review.user = user;
    review.category = category;


    // 리뷰 저장
    const newReview = await reviewRepository.save(review);

    //리뷰 이미지 저장
    const imagePromises = reviewImages.map(async (image: string) => {
      const reviewImg = new ReviewImg();
      reviewImg.review = newReview;
      reviewImg.image = image;
      return reviewImgRepository.save(reviewImg);
    });

    await Promise.all(imagePromises);

    res.status(201).send({ message: 'Review created successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to create review' });
  }
};
