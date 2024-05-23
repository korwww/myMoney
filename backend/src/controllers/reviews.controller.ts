import { Response, RequestHandler } from 'express';
import {
  IResponsePagination,
  getReviewList,
  createPagination,
  IResponseReview,
  create,
  update,
  serviceReviewDetails,
  approveReview,
  serviceDeleteReview,
  serviceGetUnverifiedReviews,
} from '../services/review.service';
import { CustomRequest } from '../middlewares/authentication';
import { ERROR_MESSAGE } from '../constance/errorMessage';

export interface IReviewQueryParams {
  categoryId?: number;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  myReviews?: boolean;
  currentPage?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: 'ASC' | 'DESC';
}

export interface IResponseData {
  reviews?: IResponseReview[];
  pagination?: IResponsePagination;
}

const parseQueryParamsToInterface = (
  queryParams: Record<string, any>,
): IReviewQueryParams => {
  return {
    categoryId:
      typeof queryParams.categoryId === 'string'
        ? parseInt(queryParams.categoryId, 10)
        : undefined,
    isVerified:
      typeof queryParams.isVerified === 'string'
        ? queryParams.isVerified === 'true'
        : undefined,
    query:
      typeof queryParams.query === 'string' &&
      queryParams.query.trim().length > 0
        ? queryParams.query
        : undefined,
    liked:
      typeof queryParams.liked === 'string'
        ? queryParams.liked === 'true'
        : undefined,
    myReviews:
      typeof queryParams.myReviews === 'string'
        ? queryParams.myReviews === 'true'
        : undefined,
    currentPage:
      typeof queryParams.currentPage === 'string' &&
      parseInt(queryParams.currentPage, 10) > 0
        ? parseInt(queryParams.currentPage, 10)
        : undefined,
    limit:
      typeof queryParams.limit === 'string' &&
      parseInt(queryParams.limit, 10) > 0 &&
      parseInt(queryParams.limit, 10) <= 100
        ? parseInt(queryParams.limit, 10)
        : undefined,
    sortBy:
      typeof queryParams.sortBy === 'string' ? queryParams.sortBy : undefined,
    orderBy: queryParams.orderBy === 'DESC' ? 'DESC' : 'ASC',
  };
};

export const getReviewsWithPagination = async (
  req: CustomRequest,
  res: Response,
) => {
  const queryParams = parseQueryParamsToInterface(req.query);
  const userId: number | undefined = req.user?.id;

  let responseData: IResponseData = {};

  try {
    const { reviews, totalCount } = await getReviewList({
      ...queryParams,
      userId,
    });
    responseData.reviews = reviews;

    const pagination = await createPagination(
      queryParams.currentPage || 1,
      queryParams.limit || 10,
      totalCount,
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

export const getReviewDetails: RequestHandler<{ id: string }> = async (
  req: CustomRequest,
  res,
) => {
  const id = parseInt(req.params.id);
  const userId = req.user?.id;

  try {
    const responseData = await serviceReviewDetails(id, userId);
    return res.status(200).json(responseData);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeReview: RequestHandler<{ id: string }> = async (
  req: CustomRequest,
  res,
) => {
  if (!req.user) {
    throw new Error(ERROR_MESSAGE.INVALID_USER);
  }
  const userId = req.user.id;
  const reviewId = parseInt(req.params.id);

  try {
    await serviceDeleteReview(reviewId, userId);

    res.status(200).send({ status: 200, message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

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

export const approveReviewByAdmin = async (
  req: CustomRequest,
  res: Response,
) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }

  const reviewId = parseInt(req.params.id);

  try {
    await approveReview(reviewId);
    res.status(200).send({ message: 'success' });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUnverifiedReviews = async (
  req: CustomRequest,
  res: Response,
) => {
  const { isAdmin } = req.user!;
  if (!isAdmin) {
    throw new Error(ERROR_MESSAGE.DENIED);
  }
  try {
    const reviews = await serviceGetUnverifiedReviews();
    res.status(200).send({ message: 'success', reviews });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
