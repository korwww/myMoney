import { IReview } from '@/models/review.model';
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
  currentPage: number | undefined;
}

export const fetchReviews = async (params: FetchReviewsParams) => {
  const { data } = await httpClient.get('/reviews', {
    params: { ...params, limit: 10 },
  });
  return data;
};
