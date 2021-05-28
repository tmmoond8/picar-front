const develop = {
  KAKAO_LOGIN_KEY: 'eaca64fa795006e298e348acc14ab691',
  KAKAO_USER_API_KEY: '466b2d4c7394790641047c7226aa9c4b',
  KAKAO_LOGIN_BRIDGE_URL: 'http://192.168.1.165:8100/login/kakao/index.html',
  API_URL: 'http://192.168.1.165:4040/api',
};

const production = {
  KAKAO_LOGIN_KEY: 'eaca64fa795006e298e348acc14ab691',
  KAKAO_USER_API_KEY: '466b2d4c7394790641047c7226aa9c4b',
  KAKAO_LOGIN_BRIDGE_URL:
    'https://tmmoond8.github.io/owner-front/public/login/kakao/',
  API_URL: 'https://api.owwners.com/api',
};

if (window.location.host === 'tmmoond8.github.io') {
  window.__OWWNERS__ = production;
} else {
  window.__OWWNERS__ = develop;
}
