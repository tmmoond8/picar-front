import api from './config';

export const list = () => api.get('/article/list');
export const get = (articleId: number | string) =>
  api.get(`/article/${articleId}`);
