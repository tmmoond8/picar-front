import api from './config';

export const log = (data: Record<string, string | number>) =>
  api.post('/test/log', data);
