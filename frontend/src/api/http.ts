import { handleGoLogin } from '@/utils/routingUtils';
import axios, { AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

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

  axiosInstance.interceptors.request.use((config) => {
    if (config.data) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data) {
        response.data = camelcaseKeys(response.data, { deep: true });
      }
      return response;
    },
    (error) => {
      console.error(error);
      error.response.data = camelcaseKeys(error.response.data);

      if (error.status === 401 || error.response.status === 401) {
        handleGoLogin();
        return;
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();
