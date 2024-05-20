import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { likeReview, unlikeReview } from '@/api/review.api';

export const useLike = (reviewId: number, storeIsLiked: boolean) => {
  const [isLiked, setIsLiked] = useState(storeIsLiked);

  const likeToggleAction = async () => {
    if (isLiked) {
      await unlikeReview(reviewId);
      setIsLiked(false);
      return;
    } else {
      await likeReview(reviewId);
      setIsLiked(true);
      return;
    }
  };

  const likeToggleMutation = useMutation({
    mutationFn: likeToggleAction,
    throwOnError: true,
  });

  const likeToggle = () => {
    likeToggleMutation.mutate();
  };

  return { likeToggle, localIsLiked: isLiked };
};
