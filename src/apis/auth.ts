import api from './config';

import { SignUpUser } from '../types/User';

export const kakaoLogin = (data: SignUpUser) => api.post('/auth/login/kakao', data);
export const check = (snsId: string, provider: string) => api.get(`/auth/check?snsId=${snsId}&provider=${provider}`);
export const getUser = () => api.get('/auth/getUser');
