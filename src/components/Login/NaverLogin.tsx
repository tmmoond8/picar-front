/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import ReactNaverLogin from 'react-naver-login';
import { toast } from 'react-toastify';

import env from '../../env';
import NaverLoginIcon from './login-naver.svg';

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

export default function NaverLogin(): JSX.Element {
  
  return (
    <img src={NaverLoginIcon}/>
    // <ReactNaverLogin
    //   clientId={env.REACT_APP_NAVER_CLIENT_ID}
    //   callbackUrl={env.REACT_APP_LOGIN_URL}
    //   render={(props) => (
    //     <img src={NaverLoginIcon} onClick={() => toast.success('지원 준비중 입니다. ')} />
    //   )}
    //   onSuccess={(result) => {
        
    //   }}
    //   onFailure={(err: unknown) => console.error(err)}
    // />
  );
}
