import api from './config';

export const list = () => api.get('/notification/list');
export const checkView = (id: string) =>
  api.patch('/notification/checkViews', { notificationIds: [id] });
export const checkViews = (ids: string[]) =>
  api.patch('/notification/checkViews', { notificationIds: ids });
