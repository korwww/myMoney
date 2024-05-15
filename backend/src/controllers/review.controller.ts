import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Review } from '../entity/reviews.entity';

const reviewRepository = AppDataSource.getRepository(Review);

export const findReviewById = async (req: Request, res: Response) => {
  res.status(200).json({
    message: '상세 리뷰 조회',
  });
};

export const deleteReview = async (req: Request, res: Response) => {
  res.status(200).send('리뷰 삭제');
};
