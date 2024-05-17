import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { createReview } from '@/api/review.api';
import { IReview } from '@/models/review.model';

// 훅을 정의하여 리뷰를 생성
export const useReview = () => {
  const navigate = useNavigate();

  const addToReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      alert('저장되었습니다.');
      navigate('/list');
    },
    throwOnError: true,
  });

  const addToReview = (data: IReview) => {
    addToReviewMutation.mutate(data);
  };

  return { addToReview };
};
