import { httpClient } from './http';

export interface IsearchQuery {
  query: string;
}

export const postSearchResults = async (query: IsearchQuery) => {
  const response = await httpClient.post('/reviews/search', query);
  console.log(response.data);
  return response.data;
};
