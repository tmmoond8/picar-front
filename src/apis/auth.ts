import api from './config';
import { AxiosResponse } from 'axios';

import { SignUpUser, KakaoUser, Profile } from '../types/User';

export const kakaoSignUp = (data: SignUpUser) => api.post('/auth/signup/kakao', data);
export const kakaoLogin = 
  (body: { accessToken: string; refreshToken: string; uuid?: string}) :
    Promise<AxiosResponse<Profile | KakaoUser>> =>
    api.post('/auth/login/kakao', body);
export const owwnerLogin = (body: { email: string; password: string}) => api.post('/auth/login/owwner', body);
export const check = (snsId: string, provider: string): 
  Promise<AxiosResponse<{ data: Profile }>> => 
  api.get(`/auth/check?snsId=${snsId}&provider=${provider}`);
export const checkUUID = (uuid: string) :
  Promise<AxiosResponse<{ tokens: { accessToken: string; refreshToken: string} }>> => 
  api.get(`/auth/uuid/${uuid}`);
export const getUser = () => api.get('/auth/getUser');
export const logout = () => api.get('/auth/logout');
export const deleteUser = (code: string) => api.delete(`/auth/delete/${code}`);
