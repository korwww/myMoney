import { IReview } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
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
