// useMyReviews.ts
import { useQuery } from '@tanstack/react-query';
import { getMyReviews } from '@/api/myReview.api';
import { IReviewItem } from '@/models/review.model';

export const useMyReviews = () => {
  return useQuery<IReviewItem[], Error>({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
  });
};
