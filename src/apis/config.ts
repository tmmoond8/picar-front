import axios, { AxiosInstance } from 'axios';
import env from '../env';
import storage from '../modules/localStorage';
import { isHybrid } from '../modules/crossPlatform';

export const apiConfig = {
  baseURL: env.NODE_ENV ===  'development'
    ? `${window.location.origin}/api`.replace(':3000', ':4040')
    : env.REACT_APP_API_URL ,
  withCredentials: true,
};

const api: AxiosInstance = axios.create(apiConfig);
if (isHybrid()) {
  api.interceptors.request.use(
    (config) => {
      console.log('config');
      const owwnersToken = storage.getOwwnersToken();
      config.headers = {
        ...config.headers,
        ['X-Custom-Token']: owwnersToken,
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
      console.log('response.headers.X-Custom-Token', JSON.stringify(response.data));
      if ('X-Custom-Token' in response.headers) {
        storage.setOwwnersToken(response.headers['X-Custom-Token']);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
}

export default api;
