import { httpClient } from './http';

export const fetchUnverifiedReviews = async () => {
  const { data } = await httpClient.get('/reviews/unverifiedReviews');
  return data;
};

export const fetchApproveReview = async (reviewId: number) => {
  return await httpClient.patch(`/reviews/${reviewId}/approve`);
};
