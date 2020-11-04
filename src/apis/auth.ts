import api from './config';

import { SignUpUser } from '../types/User';

export const kakaoLogin = (data: SignUpUser) => api.post('/auth/login/kakao', data);
export const check = () => api.get('/auth/check');
