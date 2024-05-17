import { httpClient } from './http';
import { IReview } from '@/models/review.model';

export const getLikedReviews = async (): Promise<IReview[]> => {
  const { data } = await httpClient.get<IReview[]>('/reviews?liked=true');
  return data;
};
