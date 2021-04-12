/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { constants } from '../styles';
import { useLogin, LoginType } from '../hooks/auth';

import { useStore } from '../stores';
import OwwnersLogo from '../resources/images/owwners-logo.png';

const LoginPage = () => {
  const { ui } = useStore();
  const location = useLocation();
  const { code, state } = queryString.parse(location.search);
  const { login, getToken } = useLogin();

  ui.setHeaderNone();

  React.useEffect(() => {
    (async () => {
      if (code) {
        try {
          const { data: {
            access_token,
            refresh_token
          } } = await getToken(state as LoginType, code as string)
          login(state as LoginType, access_token, refresh_token);
        } catch (error) {
          alert(`login error ${state} ${JSON.stringify(error)}`);
          console.error('login error', error);
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
  bottom: ${constants.safeBottom};
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;

  img {
    width: 100%;
    max-width: 420px;
    height: auto;
  }

  h3 {
    margin-top: 8px;
    font-size: 16px;
  }
`;
