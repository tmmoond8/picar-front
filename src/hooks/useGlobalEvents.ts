import React from 'react';
import { Plugins } from '@capacitor/core';
import storage from '../modules/localStorage';
import { useLogin, LoginType } from '../hooks/auth';
import APIS from '../apis';
import { isIos } from '../modules/crossPlatform';

const { Browser, App } = Plugins;

export default function useGlobalEvents() {
  const needInitRef = React.useRef(true);
  const { login } = useLogin();
  const loginCallback = async () => {
    const uuid = storage.getUUID();
    APIS.test.log({
      message: 'loginCallback 0',
    });
    const provider = uuid && uuid.split('-')[0];
    if (uuid) {
      APIS.test.log({
        message: 'loginCallback 1',
        uuid,
      });
      try {
        const {
          data: { tokens },
        } = await APIS.auth.checkUUID(uuid);
        APIS.test.log({
          message: 'loginCallback 2',
          tokens: JSON.stringify(tokens),
        });
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
