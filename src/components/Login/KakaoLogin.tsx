/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Plugins } from '@capacitor/core';
import React from 'react';
import storage from '../../modules/localStorage';

import KakaoLoginIcon from './login-kakao.svg';
import { useModal } from '../Modal';
import env from '../../env';
import { isHybrid } from '../../modules/crossPlatform';

const { Browser } = Plugins;

interface KakaoLoginProps {
  onClose: () => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onClose } = props;
  const modal = useModal();

  const handleKakaoLogin = React.useCallback(() => {
    onClose();
    const uuid = Math.random().toString(32).split('.')[1];
    storage.setUUID(uuid);
    setTimeout(() => {
      if (isHybrid()) {
        Browser.open({ url: `${env.REACT_APP_KAKAO_LOGIN_BRIDGE_URL}?uuid=${uuid}`, windowName: 'kakaoLoginPage' });
      } else {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${env.REACT_APP_KAKAO_LOGIN_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&response_type=code`
      }
    }, 200);
  }, [modal])

  return (
    <img src={KakaoLoginIcon} onClick={handleKakaoLogin} />
  );
}