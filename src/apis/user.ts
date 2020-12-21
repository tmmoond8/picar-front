import api from './config';

export const update = (params: { 
  name: string; 
  group: string; 
  profileImage: string; 
  description: string;}) => api.put('/user/modify', params);
