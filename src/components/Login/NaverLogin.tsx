/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import ReactNaverLogin from 'react-naver-login';
import { toast } from 'react-toastify';

import env from '../../env';
import APIS from '../../apis';
import NaverLoginIcon from './login-naver.svg';
import { SignUpUser, Profile } from '../../types/User';

interface NaverLoginProps {
  onSignUp: (user: SignUpUser) => void;
  onSetUserProfile: (userProfile: Profile) => void;
}

interface NaverProfile {
  age: string;
  birthday: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  nickname: string;
  profile_image: string;
}

export default function NaverLogin(props: NaverLoginProps): JSX.Element {
  const { onSignUp, onSetUserProfile } = props;
  const handleLogin = React.useCallback(
    async (result: NaverProfile) => {
      const { id, email, nickname, profile_image } = result;
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
        snsId: id,
        name: nickname,
        thumbnail: profile_image,
        profileImage: profile_image,
        provider: 'naver',
      };
      onSignUp(user);
    },
    [onSetUserProfile, onSignUp],
  );
  return (
    <ReactNaverLogin
      clientId={env.REACT_APP_NAVER_CLIENT_ID}
      callbackUrl={env.REACT_APP_LOGIN_URL}
      render={(props) => (
        <img src={NaverLoginIcon} onClick={() => toast.success('지원 준비중 입니다. ')} />
      )}
      onSuccess={(result) => {
        handleLogin(result);
      }}
      onFailure={(err: unknown) => console.error(err)}
    />
  );
}
