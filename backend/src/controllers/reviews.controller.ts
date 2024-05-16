import { Request, Response } from 'express';
import {
  IResponsePagination,
  getReviewList,
  createPagination,
  IResponseReview,
} from '../services/review.service';
import { CustomRequest } from '../middlewares/authentication';

export interface IReviewQueryParams {
  categoryId?: number;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
  currentPage?: number;
  limit?: number;
  userId?: number;
}

export interface IResponseData {
  reviews?: IResponseReview[];
  pagination?: IResponsePagination;
}

export const getReviewsWithPagination = async (
  req: CustomRequest,
  res: Response,
) => {
  const {
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
    currentPage = 1,
    limit = 1000,
  } = req.query as IReviewQueryParams;

  let responseData: IResponseData = {};
  const userId: number | undefined = req.user?.id;

  try {
    const reviews: IResponseReview[] = await getReviewList({
      categoryId,
      isVerified,
      query,
      liked,
      best,
      myReviews,
      currentPage,
      limit,
      userId,
    });
    responseData.reviews = reviews;

    const pagination = await createPagination(
      currentPage,
      limit,
      reviews.length,
    );
    responseData.pagination = pagination;

    return res.status(200).json(responseData);
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};
