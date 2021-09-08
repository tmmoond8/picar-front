/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useLogin, LoginType } from '../hooks/auth';
import PicarLoader from '../components/PicarLoader';
import { useStore } from '../stores';

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
          console.log('before getToken');
          const { data } = await getToken(state as LoginType, code as string)
          const {
            access_token,
            refresh_token
          } = data;
          console.log('before login', data);
          login(state as LoginType, access_token, refresh_token);
        } catch (error) {
          alert(`login error ${state} ${JSON.stringify(error)}`);
          console.error('login error', error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return (
    <Page>
      <PicarLoader />
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