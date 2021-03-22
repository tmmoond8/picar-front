/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import hooks from '../hooks'
import env from '../env';

import { useStore } from '../stores';
import OwwnersLogo from '../resources/images/owwners-logo.png';

const LoginPage = () => {
  const { ui } = useStore();
  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const KakaoLogin = hooks.auth.useKakaoLogin();
  
  ui.setHeaderNone();

  React.useEffect(() => {
    (async () => {
      if (code) {
        try {
          const call = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${env.REACT_APP_KAKAO_USER_API_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&code=${code}`;
          const { data: { access_token, refresh_token } } = await axios.post(call)
          KakaoLogin(access_token, refresh_token);
        } catch (error) {
          alert('kakao login error' + JSON.stringify(error));
          console.error('kakao login error', error);
        }
      }
    })();
  }, [code])

  return (
    <Page>
      <FullLoading>
        <img src={OwwnersLogo} />
      </FullLoading>
    </Page>
  );
}

export default LoginPage;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FullLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;

  img {
    width: 172px;
  }

  h3 {
    margin-top: 8px;
    font-size: 16px;
  }
`;
