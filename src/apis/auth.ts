import api from './config';
import { AxiosResponse } from 'axios';

import { SignUpUser, KakaoUser, NaverUser, Profile } from '../types/User';
export const kakaoLogin = (body: {
  accessToken: string;
  refreshToken: string;
  uuid?: string;
}): Promise<
  AxiosResponse<
    { profile?: Profile; token: string } | { kakaoUser?: KakaoUser }
  >
> => api.post('/auth/login/kakao', body);
export const signup = (
  data: SignUpUser,
): Promise<AxiosResponse<{ profile: Profile; token: string }>> =>
  api.post('/auth/signup', data);
export const naverLogin = (body: {
  accessToken: string;
  refreshToken: string;
  uuid?: string;
}): Promise<
  AxiosResponse<
    { profile?: Profile; token: string } | { naverUser?: NaverUser }
  >
> => api.post('/auth/login/naver', body);

export const getNaverToken = (
  code: string,
): Promise<
  AxiosResponse<{ ok: boolean; accessToken: string; refreshToken: string }>
> => api.post('/auth/token', { code, provider: 'naver' });
export const owwnerLogin = (body: { email: string; password: string }) =>
  api.post('/auth/login/owwner', body);
export const check = (
  snsId: string,
  provider: string,
): Promise<AxiosResponse<{ data: Profile }>> =>
  api.get(`/auth/check?snsId=${snsId}&provider=${provider}`);
export const checkUUID = (
  uuid: string,
): Promise<
  AxiosResponse<{ tokens: { accessToken: string; refreshToken: string } }>
> => api.get(`/auth/uuid/${uuid}`);
export const getUser = () => api.get('/auth/getUser');
export const logout = () => api.get('/auth/logout');
export const deleteUser = (code: string) => api.delete(`/auth/delete/${code}`);
export const getAdmins = (): Promise<
  AxiosResponse<{ ok: boolean; message: string; admins: Profile[] }>
> => api.get('/auth/list/owwner');
