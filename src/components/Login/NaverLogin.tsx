/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Plugins } from '@capacitor/core';
import React from 'react';
import storage from '../../modules/localStorage';

import env from '../../env';
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
        Browser.open({ url: `${env.REACT_APP_NAVER_LOGIN_BRIDGE_URL}?uuid=${uuid}`, windowName: 'naverLoginPage' });
      } else {
        const naverLoginUrl = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&'
        window.location.href = `${naverLoginUrl}client_id=${env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${env.REACT_APP_LOGIN_URL}&state=naver`
      }
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])
  return (
    <NaverIcon onClick={handleNaverLogin} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <defs>
        <filter id="nl3reommma">
          <feColorMatrix in="SourceGraphic" values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0" />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#1EC800" d="M0 0L60 0 60 60 0 60z" transform="translate(-200 -659) translate(0 462) translate(200 197)" />
        <g filter="url(#nl3reommma)" transform="translate(-200 -659) translate(0 462) translate(200 197)">
          <path fill="#1EC800" d="M19.553 0.875L19.553 14.118 10.479 0.875 0.674 0.875 0.674 27.125 10.448 27.125 10.448 13.882 19.521 27.125 29.327 27.125 29.327 0.875z" transform="translate(15 16)" />
        </g>
      </g>
    </NaverIcon>
  );
}

export default NaverLogin;

const NaverIcon = styled.svg`
  border-radius: 22px;
`