import { httpClient } from './http';

export const getUserInfo = async () => {
  const { data } = await httpClient.get('/users/me');
  return data;
};
