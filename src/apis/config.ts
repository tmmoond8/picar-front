import axios, { AxiosInstance } from 'axios';
import env from '../env';

const apiUrl = env.NODE_ENV ===  'development'
  ? `${window.location.origin}/api`.replace(':3000', ':4040')
  : env.REACT_APP_API_URL 
const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default api;
