import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchReviews } from '@/api/review.api';
import { IReviewItem } from '@/models/review.model';
import { QUERYSTRING } from '@/constance/querystring';

export const useReviews = () => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  /** 쿼리스트링 분석해서 데이터 요청하는 함수
   * - categoryIdParams: 카테고리 아이디
   * - isVerifiedParams: 인증 후기 가져오기
   * - pageParams: 페이지
   */
  const fetchReviewsData = () => {
    const categoryIdParams = params.get(QUERYSTRING.CATEGORY_ID);
    const isVerifiedParams = params.get(QUERYSTRING.IS_VERIFIED);
    const pageParams = params.get(QUERYSTRING.PAGE);

    return fetchReviews({
      categoryId: categoryIdParams ? Number(categoryIdParams) : undefined,
      isVerified: isVerifiedParams === 'true' ? true : undefined,
      currentPage: pageParams ? Number(pageParams) : 1,
    });
  };

  // 전체 후기 목록에서 데이터 가져오는 쿼리
  const {
    data: reviews,
    isLoading: isLoadingFetchReviews,
    fetchNextPage: fetchReviewsNextPage,
    hasNextPage: hasNextPageFetchReviews,
  } = useInfiniteQuery({
    queryKey: ['fetchReviews'],
    queryFn: fetchReviewsData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const parseIntCurrentPage = parseInt(lastPage.pagination.currentPage, 10);
      const parseIntTotalPages = parseInt(lastPage.pagination.totalCount, 10);
      if (parseIntCurrentPage < parseIntTotalPages) {
        return parseIntCurrentPage + 1;
      }
      return null;
    },
  });

  const computedData = reviews
    ? reviews.pages.flatMap((page) =>
        page.reviews.map((review: IReviewItem) => ({
          ...review,
          isMyReview: !!review.isMyReview,
          isLiked: !!review.isLiked,
          verified: !!review.verified,
        })),
      )
    : [];

  return {
    reviews: computedData,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  };
};
