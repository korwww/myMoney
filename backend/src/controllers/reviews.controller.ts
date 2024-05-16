import { Response, RequestHandler } from 'express';
import {
  IResponsePagination,
  getReviewList,
  createPagination,
  IResponseReview,
  create,
  update,
  serviceReviewDetails,
} from '../services/review.service';
import { CustomRequest } from '../middlewares/authentication';
import { ERROR_MESSAGE } from '../constance/errorMessage';

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
    limit = 10,
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
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const getReviewDetails: RequestHandler<{ id: number }> = (req, res) => {
  const id = Number(req.params.id);

  try {
    serviceReviewDetails(id).then((responseData) => {
      return res.status(200).json(responseData);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '개별 리뷰 조회 오류' });
  }
};

export const deleteReview: RequestHandler<{ id: string }> = (req, res) => {};

export const createReview = async (req: CustomRequest, res: Response) => {
  const { id } = req.user!;

  if (!id) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }

  try {
    const { title, content, categoryId, stars, receiptImg, reviewImg } =
      req.body;

    await create(id, title, content, categoryId, stars, receiptImg, reviewImg);
    res.status(201).send({ message: 'Created' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateReview = async (req: CustomRequest, res: Response) => {
  const { id } = req.user!;

  if (!id) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  try {
    const reviewId = parseInt(req.params.id);
    const { title, content, categoryId, stars, receiptImg, reviewImg } =
      req.body;

    await update(
      id,
      reviewId,
      title,
      content,
      categoryId,
      stars,
      receiptImg,
      reviewImg,
    );
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
