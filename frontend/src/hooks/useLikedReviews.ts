import { useQuery } from '@tanstack/react-query';
import { getLikedReviews } from '@/api/myReview.api';
import { IReviewItem } from '@/models/review.model';

export const useLikedReviews = () => {
  return useQuery<IReviewItem[], Error>({
    queryKey: ['likedReviews'],
    queryFn: getLikedReviews,
  });
};
