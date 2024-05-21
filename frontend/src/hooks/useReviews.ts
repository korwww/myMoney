import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { fetchReviews } from '@/api/review.api';
import { IReviewItem } from '@/models/review.model';
import { QUERYSTRING } from '@/constance/querystring';
import { addReport } from '@/api/report.api';
import { deleteReview } from '@/api/review.api';
import { IReport } from '@/models/report.model';

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

  const {
    data: reviews,
    isLoading: isLoadingFetchReviews,
    fetchNextPage: fetchReviewsNextPage,
    hasNextPage: hasNextPageFetchReviews,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['fetchReviews', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchReviewsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const NumberCurrentPage = Number(lastPage.pagination.currentPage);
      const NumberTotalPages = Number(lastPage.pagination.totalCount);

      if (NumberCurrentPage < NumberTotalPages) {
        return NumberCurrentPage + 1;
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

  const deleteReviewInReviewsMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      alert('후기가 삭제되었습니다.');
      refetch();
    },
    throwOnError: true,
  });

  const deleteReviewInReviews = (reviewId: number) => {
    deleteReviewInReviewsMutation.mutate(reviewId);
  };

  const postReportMutation = useMutation({
    mutationFn: addReport,
    onSuccess: () => {
      alert('신고되었습니다.');
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 409) {
        alert('이미 신고한 유저입니다.');
      }
    },
    throwOnError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 409) return false;
      return true;
    },
  });
  const postReport = (data: IReport) => {
    postReportMutation.mutate(data);
  };

  return {
    reviews: computedData,
    updateParams,
    isLoadingFetchReviews,
    fetchReviewsNextPage,
    hasNextPageFetchReviews,
    postReport,
    deleteReviewInReviews,
  };
};
