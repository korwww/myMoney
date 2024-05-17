import { httpClient } from './http';
import { IReview } from '@/models/review.model';

export const getMyReviews = async (): Promise<IReview[]> => {
  const { data } = await httpClient.get<IReview[]>('/reviews?mine=true');
  return data;
};
