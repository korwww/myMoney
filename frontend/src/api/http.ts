import axios, { AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';

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
      if (response.data) {
        response.data = camelcaseKeys(response.data);
      }
      return response;
    },
    (error) => {
      console.error(error);

      if (error.status === 401) {
        // 로그인 유저 정보 삭제 로직 추가
        window.location.href = '/login';
        return;
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();
