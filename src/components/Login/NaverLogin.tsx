/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import APIS from '../../apis';

import NaverLoginIcon from './login-naver.svg';
import { SignUpUser, Profile } from '../../types/User';

interface NaverLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
}

export default function NaverLogin(props: NaverLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile } = props;
  const handleLogin = React.useCallback(
    async (result) => {
      const {
        id,
        naver_account: {
          email,
          profile: { nickname, profile_image_url, thumbnail_image_url },
        },
      } = result.profile;
      try {
        const {
          data: { data },
        } = await APIS.auth.check(id, 'naver');
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
        provider: 'naver',
      };
      onSignUp(user);
    },
    [onSetUserProfile, onSignUp],
  );
  return <img src={NaverLoginIcon} />;
}
