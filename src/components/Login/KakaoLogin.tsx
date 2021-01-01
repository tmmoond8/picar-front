/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import APIS from '../../apis';
import env from '../../env';

// import KakaoModule from './KakaoModule';
import KakaoLoginIcon from './login-kakao.svg';
import { SignUpUser, Profile } from '../../types/User';
import { useBottomSheet } from '../BottomSheet';


interface KakaoLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
  onClose: () => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile, onClose } = props;
  const bottomSheet = useBottomSheet();

  const handleSaveUser = React.useCallback(
    async (result) => {
      const {
        id,
        kakao_account: {
          email,
          profile: { nickname, profile_image_url, thumbnail_image_url },
        },
      } = result.profile;
      try {
        const {
          data: { data },
        } = await APIS.auth.check(id, 'kakao');
        if (data) {
          onSetUserProfile(data);
          return;
        }
      } catch (error) {
        return;
      }

      const user: SignUpUser = {
        email,
        snsId: id.toString(),
        name: nickname,
        thumbnail: thumbnail_image_url,
        profileImage: profile_image_url,
        provider: 'kakao',
      };
      onSignUp(user);
    },
    [onSetUserProfile, onSignUp],
  );

  const handleKakaoLogin = React.useCallback(() => {
    onClose();
    setTimeout(() => {
      window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${env.REACT_APP_KAKAO_LOGIN_KEY}&redirect_uri=${env.REACT_APP_NAVER_LOGIN_CALLBACK_URL}&response_type=code`
    }, 200);
  }, [bottomSheet])

  return (
    <img src={KakaoLoginIcon} onClick={handleKakaoLogin}/>
  );
}