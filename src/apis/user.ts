import api from './config';

export const update = (params: { 
  name: string; 
  group: string; 
  profileImage?: string; 
  description: string;}) => api.put('/user/modify', params);

export const search = (search: string) => api.get(`/user/search?search=${search}`)
export const get = (code: string) => api.get(`/user/${code}`)