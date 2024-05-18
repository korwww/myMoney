import { httpClient } from './http';

export interface IsearchQuery {
  query: string;
}

export const postSearchResults = async (query: IsearchQuery) => {
  const response = await httpClient.post(`/reviews?query=${query}`);
  return response.data;
};
