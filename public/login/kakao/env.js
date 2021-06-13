const develop = {
  KAKAO_LOGIN_KEY: '29bd68786fc799a70d7a8a0ec18b93ee',
  KAKAO_USER_API_KEY: '2894e96c1db14062fc4b2f2cf4119641',
  KAKAO_LOGIN_BRIDGE_URL: 'http://192.168.1.165:8200/login/kakao/',
  API_URL: 'http://192.168.1.165:6060/api',
};

const production = {
  KAKAO_LOGIN_KEY: '29bd68786fc799a70d7a8a0ec18b93ee',
  KAKAO_USER_API_KEY: '2894e96c1db14062fc4b2f2cf4119641',
  KAKAO_LOGIN_BRIDGE_URL: 'https://www.picar.kr/login/kakao/',
  API_URL: 'https://api.picar.kr/api',
};

if (window.location.host === 'www.picar.kr') {
  window.__PICAR__ = production;
} else {
  window.__PICAR__ = develop;
}
