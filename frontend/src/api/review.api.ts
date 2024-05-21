import { IReview, IReviewDetail } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

export const updateReview = async (id: string, reviewData: IReview) => {
  return await httpClient.patch<IReview>(`/reviews/${id}`, reviewData);
};

interface FetchReviewsParams {
  categoryId?: number;
  isVerified?: true;
  currentPage?: number;
  query?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: number;
}

export const fetchReviews = async (params: FetchReviewsParams) => {
  const { data } = await httpClient.get('/reviews', {
    params: { ...params },
  });
  return data;
};

export const fetchReview = async (reviewId: string) => {
  const { data } = await httpClient.get<IReviewDetail>(`/reviews/${reviewId}`);
  return data;
};

export const likeReview = async (reviewId: number) => {
  const { data } = await httpClient.post(`/likes/${reviewId}`);
  return data;
};

export const unlikeReview = async (reviewId: number) => {
  const { data } = await httpClient.delete(`/likes/${reviewId}`);
  return data;
};

export const deleteReview = async (reviewId: number) => {
  const { data } = await httpClient.delete(`/reviews/${reviewId}`);
  return data;
};
