import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default api;
