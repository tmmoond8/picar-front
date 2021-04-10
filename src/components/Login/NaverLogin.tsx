/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Plugins } from '@capacitor/core';
import React from 'react';
import storage from '../../modules/localStorage';

import env from '../../env';
import NaverLoginIcon from './login-naver.svg';
import { useModal } from '../Modal';
import { isHybrid } from '../../modules/crossPlatform';

const { Browser } = Plugins;

const NaverLogin: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const modal = useModal();

  const handleNaverLogin = React.useCallback(() => {
    onClose();

    const uuid = 'naver-' + Math.random().toString(32).split('.')[1];
    storage.setUUID(uuid);
    setTimeout(() => {
      if (isHybrid()) {
        Browser.open({ url: `${env.REACT_APP_KAKAO_LOGIN_BRIDGE_URL}?uuid=${uuid}`, windowName: 'naverLoginPage' });
      } else {
        const naverLOginUrl = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&'
        window.location.href = `${naverLOginUrl}client_id=${env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${env.REACT_APP_LOGIN_URL}&state=naver`
      }
    }, 200);
  }, [modal])
  return (
    <img src={NaverLoginIcon} onClick={handleNaverLogin} />
  );
}

export default NaverLogin;
