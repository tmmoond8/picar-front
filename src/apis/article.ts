import api from './config';

export const list = () => api.get(`/article/list`);
export const getUserArticles = (code: string) => api.get(`/article/list/${code}`);
export const search = (search: string) => api.get(`/article/search?search=${search}`);
export const listBookmark = (articleIds: number[]) => api.get(`/article/list/bookmark?articleIds=[${articleIds.toString()}]`);
export const listPop = () => api.get('/article/list/pop');
export const get = (articleId: number | string) =>
  api.get(`/article/${articleId}`);
export const write = (data: {
  title: string;
  content: string;
  group: string;
  photos?: string;
  thumbnail?: string;
}) => api.post('/article/write', data);
export const remove = (articleId: number | string) =>
  api.delete(`/article/remove/${articleId}`);
export const update = (articleId: number | string, data: {
  title: string;
  content: string;
  group: string;
  photos?: string;
  thumbnail?: string;
}) => api.put(`/article/update/${articleId}`, data);