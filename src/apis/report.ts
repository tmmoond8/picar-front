import { AxiosResponse } from 'axios';
import api from './config';
import { Report } from '../types/Report';

export const list = (): Promise<
  AxiosResponse<{ ok: boolean; message: string; reports: Report[] }>
> => api.get('/report/list');
export const add = (
  articleId: number,
  content: string,
  commentId?: string,
): Promise<AxiosResponse<{ ok: boolean; message: string; report: Report }>> =>
  api.post(`/report/add/${articleId}`, { commentId, content });
export const remove = (
  articleId: number,
  commentId?: string,
): Promise<AxiosResponse<{ ok: boolean; message: string }>> =>
  api.delete(
    `/report/remove/${articleId}${commentId ? `?commentId=${commentId}` : ''}`,
  );
