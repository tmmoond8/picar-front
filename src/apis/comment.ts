import { AxiosResponse } from 'axios';
import Comment from '../types/Comment';
import api from './config';

export const list = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string; comments: Comment[]}>> => api.get(`/comment/list/${articleId}`);
export const write = (data: {
  content: string;
  articleId: number;
  about?: string;
}): Promise<AxiosResponse<{ ok: boolean; message: string; comment: Comment}>> => api.post('/comment/write', data);
export const count = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string; count: number}>> => api.get(`/comment/count/${articleId}`);
