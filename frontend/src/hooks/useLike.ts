import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { likeReview, unlikeReview } from '@/api/review.api';

interface useLikeProps {
  reviewId: number;
  isLikedDB: boolean;
  likesDB: number;
}

export const useLike = ({ reviewId, isLikedDB, likesDB }: useLikeProps) => {
  const NumberLikes = Number(likesDB);
  const [isLiked, setIsLiked] = useState(isLikedDB);
  const [likes, setLikes] = useState(NumberLikes);

  const likeToggleAction = async () => {
    if (isLiked) {
      await unlikeReview(reviewId);
      setIsLiked(false);
      setLikes(likes - 1);
      return;
    } else {
      await likeReview(reviewId);
      setIsLiked(true);
      setLikes(likes + 1);
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

  return { likeToggle, localIsLiked: isLiked, localLikes: likes };
};
