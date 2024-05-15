import { RequestHandler } from 'express';

import {
  create,
  serviceReviewList,
  update,
  serviceReviewDetails,
  deleteOne,
} from '../services/review.service';
import { CustomRequest } from '../middlewares/authentication';
import { Response } from 'express';
import { ERROR_MESSAGE } from '../constance/errorMessage';

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
