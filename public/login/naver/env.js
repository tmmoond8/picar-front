const develop = {
  NAVER_CLIENT_ID: 'd3dL6VA0QQaGHiVMswZ2',
  NAVER_CLIENT_SECRET: 'eXGhuyO9QK',
  NAVER_LOGIN_BRIDGE_URL: 'http://192.168.1.165:8200/login/naver/',
  API_URL: 'http://192.168.1.165:6060/api',
};

const production = {
  NAVER_CLIENT_ID: 'vFqCamXUUg2N8fsuScEE',
  NAVER_CLIENT_SECRET: 'nC9nDXXnLk',
  NAVER_LOGIN_BRIDGE_URL: 'https://www.picar.kr/login/naver/',
  API_URL: 'https://api.picar.kr/api',
};

if (window.location.host === 'www.picar.kr') {
  window.__PICAR__ = production;
} else {
  window.__PICAR__ = develop;
}
