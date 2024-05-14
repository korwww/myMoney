import { Request, Response } from 'express';
import {
  IPagination,
  IResponseReview,
  getReviewList,
  makePagination,
} from '../services/review.service';
import { Review } from '../entity/reviews.entity';

export interface IReviewQueryParams {
  categoryId?: number;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
}

export interface IResponseData {
  reviews?: IResponseReview[];
  pagination?: IPagination;
}

export const getReviews = async (req: Request, res: Response) => {
  const { categoryId, isVerified, query, liked, best, myReviews } =
    req.query as IReviewQueryParams;

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

    const pagination: { currentPage: number; totalCount: number } =
      await makePagination();
    responseData.pagination = pagination;

    return res.status(200).json(responseData);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
