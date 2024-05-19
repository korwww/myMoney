import { httpClient } from './http';

export const getSuspendedUsers = async () => {
  const { data } = await httpClient.get('/reports/users');
  return data;
};

export const deleteReport = async (reportId: number) => {
  return await httpClient.delete(`/reports/${reportId}`);
};
