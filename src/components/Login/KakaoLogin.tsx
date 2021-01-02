/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import APIS from '../../apis';
import { useStore } from '../../stores';

// import KakaoModule from './KakaoModule';
import KakaoLoginIcon from './login-kakao.svg';
import { SignUpUser, Profile } from '../../types/User';
import { useBottomSheet } from '../BottomSheet';
import { Browser } from '@capacitor/core';


interface KakaoLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
  onClose: () => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile, onClose } = props;
  const { util } = useStore();
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
    const uuid = Math.random().toString(32).split('.')[1];
    localStorage.setItem('OWWNERS_UUID', uuid)
    setTimeout(() => {
      Browser.open({ url: `/login/kakao?uuid=${uuid}`});
    }, 200);
  }, [bottomSheet])

  return (
    <img src={KakaoLoginIcon} onClick={handleKakaoLogin}/>
  );
}