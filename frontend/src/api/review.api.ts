import { IReview } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};

export const getReviewById = async (id: string) => {
  return await httpClient.get(`/reviews/${id}`);
};

export const updateReview = async (id: string, reviewData: IReview) => {
  return await httpClient.patch<IReview>(`/reviews/${id}`, reviewData);
}

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
