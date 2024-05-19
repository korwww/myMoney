import { httpClient } from './http';

export const fetchCategory = async () => {
  const { data } = await httpClient.get('/category');
  return data;
};
