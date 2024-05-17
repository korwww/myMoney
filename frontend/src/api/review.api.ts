import { IReview } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

export const fetchReviews = async () => {
  const { data } = await httpClient.get('/reviews');
  return data;
};
