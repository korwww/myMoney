import { fetchLikedReviews } from '@/api/likedReviews.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useLikedReviews = () => {
  return useInfiniteQuery({
    queryKey: ['likedReviews'],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchLikedReviews({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
};
