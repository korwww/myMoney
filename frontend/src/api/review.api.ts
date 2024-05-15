import { IReview } from '@/models/review.model';
import { httpClient } from './http';

export const createReview = async (reviewData: IReview) => {
  return await httpClient.post<IReview>('/reviews', reviewData);
};
