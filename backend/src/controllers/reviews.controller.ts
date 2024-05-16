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
  deleteOne,
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
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

export const getReviewDetails: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  const id = Number(req.params.id);

  try {
    const responseData = await serviceReviewDetails(id);
    return res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '개별 리뷰 조회 오류' });
  }
};

export const deleteReview: RequestHandler<{ id: string }> = async (
  req: CustomRequest,
  res,
) => {
  try {
    const reviewId = Number(req.params.id);

    if (!req.user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const userId = req.user.id;

    const isSuccess = await deleteOne(reviewId, userId);

    if (!isSuccess) {
      throw new Error('리뷰 삭제 실패');
    }

    return res.status(200).send('리뷰 삭제 성공');
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return res.status(500).json({ message: err.message || '리뷰 삭제 오류' });
    }

    return res.status(500).json({ message: '리뷰 삭제 오류' });
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
