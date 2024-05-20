import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchReviews } from '@/api/review.api';
import { IReviewItem } from '@/models/review.model';
import { QUERYSTRING } from '@/constance/querystring';

export const useReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** 쿼리스트링 분석해서 데이터 요청하는 함수
   * - categoryIdParams: 카테고리 아이디
   * - isVerifiedParams: 인증 후기 가져오기
   * - pageParams: 페이지
   * - queryParams: 검색 결과
   */
  const fetchReviewsData = (pageParams: number) => {
    const categoryIdParams = searchParams.get(QUERYSTRING.CATEGORY_ID);
    const isVerifiedParams = searchParams.has(QUERYSTRING.IS_VERIFIED);
    const queryParams = searchParams.get(QUERYSTRING.QUERY);
    const limitParams = searchParams.get(QUERYSTRING.LIMIT);

    return fetchReviews({
      categoryId: categoryIdParams ? Number(categoryIdParams) : undefined,
      isVerified: isVerifiedParams ? true : undefined,
      currentPage: pageParams,
      query: queryParams ? String(queryParams) : undefined,
      limit: limitParams ? Number(limitParams) : 10,
    });
  };

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      return newParams;
    });
  };

  // 전체 후기 목록에서 데이터 가져오는 쿼리
  const {
    data: reviews,
    isLoading: isLoadingFetchReviews,
    fetchNextPage: fetchReviewsNextPage,
    hasNextPage: hasNextPageFetchReviews,
  } = useInfiniteQuery({
    queryKey: ['fetchReviews', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchReviewsData(pageParam),
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
    updateParams,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
  };
};
