/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import storage from '../../modules/localStorage';

import KakaoLoginIcon from './login-kakao.svg';
import { useModal } from '../Modal';
import env from '../../env';

interface KakaoLoginProps {
  onClose: () => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onClose } = props;
  const modal = useModal();
  
  const handleKakaoLogin = React.useCallback(() => {
    onClose();
    const uuid = Math.random().toString(32).split('.')[1];
    storage.setOpenerUUID(uuid);
    setTimeout(() => {
      window.location.href = `${env.REACT_APP_LOGIN_URL}/kakao?uuid=${uuid}`;
    }, 200);
  }, [modal])

  return (
    <img src={KakaoLoginIcon} onClick={handleKakaoLogin}/>
  );
}