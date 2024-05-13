import { RequestHandler } from 'express';
import { create, serviceReviewList } from '../services/review.service';
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

export const createReview = async (req: CustomRequest, res: Response) => {
  try {
    const { title, content, categoryId, stars, receiptImg, reviewImg } =
      req.body;

    const { id } = req.user!;
    if (!id) {
      throw new Error(ERROR_MESSAGE.INVALID_USER);
    }

    await create(id, title, content, categoryId, stars, receiptImg, reviewImg);

    res.status(201).send({ message: 'Created' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


