import { AxiosResponse } from 'axios';
import api from './config';

export const list = (): Promise<AxiosResponse<{ ok: boolean; message: string; bookmarks: number[]}>> => api.get('/bookmark/list');
export const add = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string}>> => api.post(`/bookmark/add/${articleId}`);
export const remove = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string}>> => api.delete(`/bookmark/remove/${articleId}`);