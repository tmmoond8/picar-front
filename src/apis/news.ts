import { AxiosResponse } from 'axios'
import api from './config';
import { NewsFeed } from '../types/News';

export const list =
  (): Promise<AxiosResponse<{ ok: boolean, message: string, news: NewsFeed[] }>> => api.get(`/news/list`);