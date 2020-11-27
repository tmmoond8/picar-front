import api from './config';

export const list = (articleId: number) => api.get(`/comment/list/${articleId}`);
export const post = (data: {
  content: string;
  articleId: number;
}) => api.post('/comment/write', data);
export const count = (articleId: number) => api.get(`/comment/count/${articleId}`);
