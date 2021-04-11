const develop = {
  NAVER_CLIENT_ID: 'LWsulM1ypIGrWgaquH5F',
  NAVER_CLIENT_SECRET: 'E8beWKyFva',
  NAVER_LOGIN_BRIDGE_URL: 'http://192.168.1.165:8100/login/naver/index.html',
  API_URL: 'http://192.168.1.165:4040/api',
};

const production = {
  NAVER_CLIENT_ID: 'eaca64fa795006e298e348acc14ab691',
  NAVER_CLIENT_SECRET: '466b2d4c7394790641047c7226aa9c4b',
  NAVER_LOGIN_BRIDGE_URL:
    'https://tmmoond8.github.io/owner-front/public/login/naver/',
  API_URL: 'https://api.owwners.com/api',
};

if (window.location.host === 'tmmoond8.github.io') {
  window.__OWWNERS__ = production;
} else {
  window.__OWWNERS__ = develop;
}
