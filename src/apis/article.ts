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
