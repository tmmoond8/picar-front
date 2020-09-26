import api from './config';

export const list = () => api.get('/article/list');
