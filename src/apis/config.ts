import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import env from '../env';
import storage from '../modules/localStorage';

export const apiConfig = {
  baseURL: env.REACT_APP_API_URL,
  withCredentials: true,
};

const api: AxiosInstance = axios.create(apiConfig);

const appHeaders = (headers: any) => {
  const token = storage.getToken();
  return {
    ...headers,
    ...(token ? { 'X-Custom-Token': token } : {}),
  };
};

export default {
  get: (url: string, config?: AxiosRequestConfig) =>
    api.get(url, {
      ...config,
      headers: appHeaders(config?.headers),
    }),
  delete: (url: string, config?: AxiosRequestConfig) =>
    api.delete(url, {
      ...config,
      headers: appHeaders(config?.headers),
    }),
  post: (url: string, body?: any, config?: AxiosRequestConfig) =>
    api.post(url, body, {
      ...config,
      headers: appHeaders(config?.headers),
    }),
  put: (url: string, body?: any, config?: AxiosRequestConfig) =>
    api.put(url, body, {
      ...config,
      headers: appHeaders(config?.headers),
    }),
  patch: (url: string, body?: any, config?: AxiosRequestConfig) =>
    api.patch(url, body, {
      ...config,
      headers: appHeaders(config?.headers),
    }),
};
