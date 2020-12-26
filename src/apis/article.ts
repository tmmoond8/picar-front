import api from './config';

export const list = () => api.get('/article/list');
export const get = (articleId: number | string) =>
  api.get(`/article/${articleId}`);
export const write = (data: {
  title: string;
  content: string;
  group: string;
  photos: string;
}) => api.post('/article/write', data);
export const remove = (articleId: number | string) =>
  api.delete(`/article/remove/${articleId}`);
export const update = (articleId: number | string, data: {
  title: string;
  content: string;
  group: string;
  photos: string;
}) => api.put(`/article/update/${articleId}`, data);