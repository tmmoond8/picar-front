import api from './config';

import { SignUpUser } from '../types/User';

export const kakaoSignUp = (data: SignUpUser) => api.post('/auth/signup/kakao', data);
export const kakaoLogin = (body: { accessToken: string; refreshToken: string; uuid: string}) => api.post('/auth/login/kakao', body);
export const check = (snsId: string, provider: string) => api.get(`/auth/check?snsId=${snsId}&provider=${provider}`);
export const checkUUID = (uuid: string) => api.get(`/auth/checkUUID?uuid=${uuid}`);
export const getUser = () => api.get('/auth/getUser');
export const logout = () => api.get('/auth/logout');
export const deleteUser = (code: string) => api.delete(`/auth/delete/${code}`);
