import { useMutation, useQuery } from '@tanstack/react-query';
import { createReview, getReviewById } from '@/api/review.api';
import { IReview } from '@/models/review.model';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useReview = (id?:string) => {
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


  return { addToReview, review: reviewData?.data, isLoading };
};
