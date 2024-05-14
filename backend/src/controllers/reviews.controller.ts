import { Request, Response } from 'express';
import {
  IPagination,
  IResponseReview,
  getReviewList,
  createPagination,
} from '../services/review.service';
import { Review } from '../entity/reviews.entity';

export interface IReviewQueryParams {
  categoryId?: number;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
  currentPage?: number;
  limit?: number;
}

export interface IResponseData {
  reviews?: IResponseReview[];
  pagination?: IPagination;
}

export const getReviews = async (req: Request, res: Response) => {
  const {
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
    currentPage = 1,
    limit,
  } = req.query as IReviewQueryParams;

  let responseData: IResponseData = {};

  try {
    const reviews: IResponseReview[] = await getReviewList({
      categoryId,
      isVerified,
      query,
      liked,
      best,
      myReviews,
    });
    responseData.reviews = reviews;

    const pagination = await createPagination(currentPage);
    responseData.pagination = pagination;

    return res.status(200).json(responseData);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
