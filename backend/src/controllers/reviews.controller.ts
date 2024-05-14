import { RequestHandler } from 'express';
import {
  serviceReviewDetails,
  serviceReviewList,
} from '../services/review.service';

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
