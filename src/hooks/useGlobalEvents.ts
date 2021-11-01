import React from 'react';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import storage from '../modules/localStorage';
import { useLogin, LoginType } from '../hooks/auth';
import APIS from '../apis';
import { isIos } from '../modules/crossPlatform';

export default function useGlobalEvents() {
  const needInitRef = React.useRef(true);
  const { login } = useLogin();
  const loginCallback = async () => {
    const uuid = storage.getUUID();
    const provider = uuid && uuid.split('-')[0];
    if (uuid) {
      try {
        const {
          data: { tokens },
        } = await APIS.auth.checkUUID(uuid);
        storage.clearUUID();
        if (tokens) {
          login(provider as LoginType, tokens.accessToken, tokens.refreshToken);
          return;
        }
      } catch (error) {
        return;
      }
    }
  };

  if (needInitRef.current) {
    needInitRef.current = false;
    if (isIos()) {
      Browser.addListener('browserFinished', () => {
        loginCallback();
      });
    } else {
      App.addListener('appStateChange', async ({ isActive }) => {
        if (isActive) {
          loginCallback();
        }
      });
    }
  }
}
