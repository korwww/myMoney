import { IReview } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
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
