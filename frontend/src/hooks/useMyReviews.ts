import { useQuery } from '@tanstack/react-query';
import { getMyReviews } from '@/api/myReview.api';

export const useMyReviews = () => {
  return useQuery({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
  });
};
