import { IReviewQueryParams } from '../controllers/reviews.controller';
import { allReviews } from '../models/review.model';

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
