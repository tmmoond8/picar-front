import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL ?? '',
  REACT_APP_NAVER_CLIENT_ID: process.env.REACT_APP_NAVER_CLIENT_ID ?? '',
  REACT_APP_NAVER_LOGIN_CALLBACK_URL: process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL ?? '',
}