import api from './config';

import { SignUpUser } from '../types/User';

export const kakaoSignUp = (data: SignUpUser) => api.post('/auth/login/kakao', data);
export const kakaoLogin = (body: { accessToken: string; refreshToken: string}) => api.post('/auth/login/kakao', body);
export const check = (snsId: string, provider: string) => api.get(`/auth/check?snsId=${snsId}&provider=${provider}`);
export const getUser = () => api.get('/auth/getUser');
