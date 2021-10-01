import dotenv from 'dotenv';

dotenv.config();
const isDev = process.env.REACT_APP_DEV === 'develop';
const SCHEME = isDev ? 'http' : 'https';
const HOST = isDev
  ? `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
  : 'www.picar.kr';
const API_URL = isDev
  ? `${SCHEME}://${process.env.REACT_APP_HOST}:6060/api`
  : `${SCHEME}://api.picar.kr/api`;

const config = {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_API_URL: API_URL,
  REACT_APP_PLATFORM: process.env.REACT_APP_PLATFORM ?? 'web',
  REACT_APP_STATIC_DOMAIN: process.env.REACT_APP_STATIC_DOMAIN ?? '',
  REACT_APP_NAVER_CLIENT_ID: process.env.REACT_APP_NAVER_CLIENT_ID ?? '',
  REACT_APP_NAVER_CLIENT_SECRET:
    process.env.REACT_APP_NAVER_CLIENT_SECRET ?? '',
  REACT_APP_NAVER_LOGIN_BRIDGE_URL: `${SCHEME}://${HOST}/login/naver`,
  REACT_APP_LOGIN_URL: `${SCHEME}://${HOST}/login/`,
  REACT_APP_KAKAO_LOGIN_BRIDGE_URL: `${SCHEME}://${HOST}/login/kakao/`,
  REACT_APP_KAKAO_LOGIN_KEY: process.env.REACT_APP_KAKAO_LOGIN_KEY ?? '',
  REACT_APP_KAKAO_USER_API_KEY: process.env.REACT_APP_KAKAO_USER_API_KEY ?? '',
  REACT_APP_FB_API_KEY: process.env.REACT_APP_FB_API_KEY ?? '',
  REACT_APP_FB_AUTH_DOMAIN: process.env.REACT_APP_FB_AUTH_DOMAIN ?? '',
  REACT_APP_FB_URL: process.env.REACT_APP_FB_URL ?? '',
  REACT_APP_FB_PROJECT_ID: process.env.REACT_APP_FB_PROJECT_ID ?? '',
  REACT_APP_FB_STORAGE_BUCKET: process.env.REACT_APP_FB_STORAGE_BUCKET ?? '',
  REACT_APP_FB_MESSAGING_SENDER_ID:
    process.env.REACT_APP_FB_MESSAGING_SENDER_ID ?? '',
  REACT_APP_FB_APP_ID: process.env.REACT_APP_FB_APP_ID ?? '',
  REACT_APP_FB_MEASUREMENT_ID: process.env.REACT_APP_FB_MEASUREMENT_ID ?? '',
  REACT_APP_DEV: process.env.REACT_APP_DEV ?? '',
  REACT_APP_GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID ?? '',
};

export default config;

if (globalThis) {
  (globalThis as any).__git__ = process.env.REACT_APP_GIT_HASH;
}
