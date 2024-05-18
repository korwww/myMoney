import { httpClient } from './http';

export const fetchLikedReviews = async ({ pageParam = 1 }) => {
  const response = await httpClient.get(
    `/reviews?liked=true&page=${pageParam}`,
  );
  return response.data;
};
