import { IReviewQueryParams } from '../controllers/reviews.controller';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/category.entity';
import { ReviewImg } from '../entity/review_img.entity';
import { Review } from '../entity/reviews.entity';
import { User } from '../entity/users.entity';
import {
  allReviews,
  createNewReview,
  findReviewById,
  updateReviewData,
  allComments,
  reviewDetails,
} from '../models/review.model';
import { findUserById } from '../models/user.model';

const categoryRepository = AppDataSource.getRepository(Category);

export const serviceReviewList = async ({
  categoryId,
  isVerified,
  query,
  liked,
  best,
  myReviews,
}: IReviewQueryParams) => {
  //이 함수에서 response 객체 생성
  //현재는 전체 리뷰를 조회해 직접 내보내고 있지만, 쿼리스트링에 따라 다른 형태의 reponse 객체를 만들어 controller로 보냄
  //pagenation 제작, 베스트 리뷰 선정, 검색 처리 등등은 서비스 레이어에서 처리
  return await allReviews({
    categoryId,
    isVerified,
    query,
    liked,
    best,
    myReviews,
  });
};

const selectBestReviews = () => {
  //데이터베이스로부터 crud를 통해 정보를 가져오고, 이 함수에서 베스트 리뷰를 선정
};

const makePagenation = () => {
  //이 함수에서 페이지네이션 생성
};

const search = () => {
  //검색
};

export const serviceReviewDetails = async (reviewId: number) => {
  const review = await reviewDetails(reviewId);

  if (!review) {
    return null;
  }

  const comments = await allComments(reviewId);

  return {
    ...review,
    comments,
  };
};

export const create = async (
  id: number,
  title: string,
  content: string,
  categoryId: number,
  stars: number,
  receiptImg: string,
  reviewImg: string[],
) => {
  const user = await findUserById(id);
  const category = await categoryRepository.findOneBy({ id: categoryId });

  await createNewReview({
    user,
    title,
    content,
    category,
    stars,
    receiptImg,
    reviewImg,
  });
};

export const update = async (
  id: number,
  reviewId: number,
  title: string,
  content: string,
  categoryId: number,
  stars: number,
  receiptImg: string,
  reviewImg: string[],
) => {
  const user = await findUserById(id);
  const category = await categoryRepository.findOneBy({ id: categoryId });

  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  await updateReviewData(review, {
    user,
    title,
    content,
    category,
    stars,
    receiptImg,
    reviewImg,
  });
};
