import { RequestHandler } from 'express';
import { serviceAllReviews } from '../services/review.service';

export interface IReviewQueryParams {
  categoryId?: string;
  isVerified?: boolean;
  query?: string;
  liked?: boolean;
  best?: boolean;
  myReviews?: boolean;
}

export const getReviews: RequestHandler<{}, {}, {}, IReviewQueryParams> = (
  req,
  res,
) => {
  const { categoryId, isVerified, query, liked, best, myReviews } = req.query;

  serviceAllReviews({
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
  }).then(
    (responseData) => {
      res.status(200).json({ reviews: responseData });
    },
    (err) => {
      console.log(err);
      res.status(500).json({ message: '오류' });
    },
  );
};
