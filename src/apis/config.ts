import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = process.env.NODE_ENV ===  'development'
  ? `${window.location.origin}/api`.replace(':3000', ':4040')
  : process.env.REACT_APP_API_URL 
const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default api;
