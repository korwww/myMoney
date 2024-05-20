import { useMutation, useQuery } from '@tanstack/react-query';
import { createReview, getReviewById, updateReview } from '@/api/review.api';
import { IReview } from '@/models/review.model';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useReview = (id?:string) => {
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

  const { data: reviewData, isLoading, refetch} = useQuery({
    queryKey: ['review', id],
    queryFn: () => id ? getReviewById(id) : undefined,
    enabled: false,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const updateToReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IReview }) => updateReview(id, data),
    onSuccess: () => {
      alert('수정되었습니다.');
      navigate('/list');
    },
    throwOnError: true,
  });
  
  const updateToReview = (id: string, data: IReview) => {
    updateToReviewMutation.mutate({ id, data });
  };


  return { addToReview, review: reviewData?.data, isLoading, updateToReview };
};
