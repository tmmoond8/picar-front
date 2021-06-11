/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
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
    const uuid = 'kakao-' + Math.random().toString(32).split('.')[1];
    storage.setUUID(uuid);
    setTimeout(() => {
      if (isHybrid()) {
        Browser.open({ url: `${env.REACT_APP_KAKAO_LOGIN_BRIDGE_URL}?uuid=${uuid}`, windowName: 'kakaoLoginPage' });
      } else {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${env.REACT_APP_KAKAO_LOGIN_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&response_type=code&state=kakao`
      }
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])

  return (
    <KakaoIcon onClick={handleKakaoLogin} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <g fill="none" fillRule="evenodd">
        <path fill="#FFE048" d="M0 0L60 0 60 60 0 60z" transform="translate(-116 -659) translate(0 462) translate(116 197)" />
        <path fill="#3C1E1E" fillRule="nonzero" d="M30 45c-8.836 0-16-5.743-16-12.83 0-4.554 2.967-8.551 7.424-10.833l-1.508-5.713c-.058-.175-.01-.36.115-.487.087-.088.202-.137.327-.137.096 0 .192.039.278.107l6.483 4.446c.941-.136 1.902-.214 2.88-.214C38.836 19.339 46 25.08 46 32.169S38.835 45 30 45" transform="translate(-116 -659) translate(0 462) translate(116 197) matrix(1 0 0 -1 0 60)" />
      </g>
    </KakaoIcon>
  );
}

const KakaoIcon = styled.svg`
  border-radius: 22px;
`