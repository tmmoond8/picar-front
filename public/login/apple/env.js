const develop = {
  APPLE_LOGIN_KEY: 'APPLE_LOGIN_KEY',
  APPLE_USER_API_KEY: 'APPLE_USER_API_KEY',
  APPLE_LOGIN_BRIDGE_URL: 'APPLE_LOGIN_BRIDGE_URL',
  APPLE_LOGIN_REDIRECT_URL: 'https://api.picar.kr/api/auth/login/apple',
  API_URL: 'API_URL',
};

const production = {
  APPLE_LOGIN_KEY: 'APPLE_LOGIN_KEY',
  APPLE_USER_API_KEY: 'APPLE_USER_API_KEY',
  APPLE_LOGIN_BRIDGE_URL: 'APPLE_LOGIN_BRIDGE_URL',
  APPLE_LOGIN_REDIRECT_URL: 'https://picar-api.loca.lt/api/auth/login/apple',
  API_URL: 'API_URL',
};

if (window.location.host === 'www.picar.kr') {
  window.__PICAR__ = production;
} else {
  window.__PICAR__ = develop;
}
