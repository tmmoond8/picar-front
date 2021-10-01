import axios, { AxiosInstance } from 'axios';
import env from '../env';
import storage from '../modules/localStorage';
import { isHybrid } from '../modules/crossPlatform';

export const apiConfig = {
  baseURL:
    env.NODE_ENV === 'development'
      ? `${window.location.origin}/api`.replace(':8200', ':6060')
      : env.REACT_APP_API_URL,
  withCredentials: true,
};

const api: AxiosInstance = axios.create(apiConfig);
if (isHybrid()) {
  api.interceptors.request.use(
    (config) => {
      const token = storage.getToken();
      config.headers = {
        ...config.headers,
        ['X-Custom-Token']: token,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (response) => {
      if ('X-Custom-Token' in response.headers) {
        storage.setToken(response.headers['X-Custom-Token']);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

export default api;
