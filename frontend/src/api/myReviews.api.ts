import { httpClient } from './http';

export const fetchMyReviews = async ({ pageParam = 1 }) => {
  const response = await httpClient.get(
    `/reviews?myReviews=true&page=${pageParam}`,
  );
  return response.data;
};
