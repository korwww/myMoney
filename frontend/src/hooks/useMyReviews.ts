import { fetchMyReviews } from '@/api/myReviews.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMyReviews = () => {
  return useInfiniteQuery({
    queryKey: ['myReviews'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchMyReviews({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
};
