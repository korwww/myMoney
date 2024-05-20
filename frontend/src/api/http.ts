import axios, { AxiosRequestConfig } from 'axios';
import { logout } from './auth.api';
import { handleGoLogin } from '@/utils/routingUtils';

const BASE_URL = 'http://localhost:3031';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(error);

      if (error.status === 401 || error.response.status === 401) {
        alert('인증 세션이 만료되었습니다. 다시 로그인해주세요.');
        sessionStorage.removeItem('myMoney-Store');
        logout();
        handleGoLogin();

        return Promise.reject(new Error('Unauthorized'));
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();
