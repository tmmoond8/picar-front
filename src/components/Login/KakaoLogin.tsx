/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import ReactKakaoLogin from 'react-kakao-login';

import { SignUpUser } from '../../types/User';

interface KakaoLoginProps {
  onLoginKakao: (user: SignUpUser) => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onLoginKakao } = props;
  const handleLogin = React.useCallback(
    (result) => {
      console.log(result);
      const {
        id,
        kakao_account: {
          email,
          profile: { nickname, profile_image_url, thumbnail_image_url },
        },
      } = result.profile;
      const { access_token } = result.response;
      localStorage.setItem('kakaoOAuth', access_token);
      const user: SignUpUser = {
        email,
        snsId: id.toString(),
        name: nickname,
        thumbnail: thumbnail_image_url,
        profile: profile_image_url,
        provider: 'kakao',
      };
      console.log(user);
      onLoginKakao(user);
    },
    [onLoginKakao],
  );
  return (
    <ReactKakaoLogin
      token={process.env.REACT_APP_KAKAO_LOGIN_KEY || ''}
      onSuccess={(result) => handleLogin(result)}
      onFail={(result: any) => console.log(result)}
      render={(props: any) => (
        <img
          src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566815760/noticon/s1118wnuadritgbmm9by.png"
          onClick={props.onClick}
        />
      )}
    />
  );
}
