const develop = {
  APPLE_LOGIN_KEY: 'APPLE_LOGIN_KEY',
  APPLE_USER_API_KEY: 'APPLE_USER_API_KEY',
  APPLE_LOGIN_BRIDGE_URL: 'APPLE_LOGIN_BRIDGE_URL',
  APPLE_LOGIN_REDIRECT_URL:
    'https://picar-api.loca.lt/api/auth/authorize/apple/app',
  API_URL: 'https://picar-api.loca.lt/api',
};

const production = {
  APPLE_LOGIN_KEY: 'APPLE_LOGIN_KEY',
  APPLE_USER_API_KEY: 'APPLE_USER_API_KEY',
  APPLE_LOGIN_BRIDGE_URL: 'APPLE_LOGIN_BRIDGE_URL',
  APPLE_LOGIN_REDIRECT_URL: 'https://api.picar.kr/api/auth/authorize/apple/app',
  API_URL: 'https://api.picar.kr/api',
};

if (window.location.host === 'www.picar.kr') {
  window.__PICAR__ = production;
} else {
  window.__PICAR__ = develop;
}
