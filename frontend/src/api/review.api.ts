import { IReview, IReviewDetail } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

interface FetchReviewsParams {
  categoryId: number | undefined;
  isVerified: true | undefined;
  page: number | undefined;
}

export const fetchReviews = async (params: FetchReviewsParams) => {
  console.log(params);
  const { data } = await httpClient.get('/reviews', {
    params: { ...params, limit: 3 },
  });
  return data;
};

export const fetchReview = async (reviewId: string) => {
  const { data } = await httpClient.get<IReviewDetail>(`/reviews/${reviewId}`);
  return data;
};

export const likeReview = async (reviewId: number) => {
  const { data } = await httpClient.post(`/likes/${reviewId}`);
  console.log(data);
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
