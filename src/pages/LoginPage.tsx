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
        <svg xmlns="http://www.w3.org/2000/svg" width="391" height="490" fill="none" viewBox="0 0 391 490">
          <path fill="#2E2E2E" d="M34.57 410.339c6.92 0 12.91 1.154 17.97 3.46 5.135 2.307 9.078 5.581 11.831 9.822 2.754 4.242 4.13 9.264 4.13 15.068 0 5.73-1.377 10.752-4.13 15.068-2.753 4.241-6.696 7.515-11.83 9.822-5.06 2.232-11.05 3.348-17.97 3.348H18.833v21.541H.752v-78.129h33.819zm-1.004 41.855c5.432 0 9.562-1.153 12.39-3.46 2.827-2.381 4.24-5.729 4.24-10.045 0-4.39-1.413-7.738-4.24-10.045-2.828-2.381-6.958-3.572-12.39-3.572H18.833v27.122h14.733zM90.71 410.339h18.082v78.129H90.711v-78.129zM174.025 489.808c-7.961 0-15.179-1.712-21.653-5.134-6.399-3.498-11.458-8.297-15.179-14.398-3.646-6.176-5.469-13.134-5.469-20.872 0-7.739 1.823-14.659 5.469-20.76 3.721-6.176 8.78-10.975 15.179-14.398 6.474-3.497 13.729-5.246 21.765-5.246 6.771 0 12.873 1.191 18.305 3.572 5.506 2.381 10.119 5.803 13.84 10.268l-11.608 10.715c-5.283-6.102-11.831-9.152-19.644-9.152-4.837 0-9.152 1.079-12.947 3.236-3.795 2.084-6.771 5.023-8.929 8.818-2.084 3.795-3.125 8.11-3.125 12.947 0 4.836 1.041 9.152 3.125 12.947 2.158 3.795 5.134 6.771 8.929 8.929 3.795 2.084 8.11 3.125 12.947 3.125 7.813 0 14.361-3.088 19.644-9.264l11.608 10.715c-3.721 4.539-8.334 7.999-13.84 10.38-5.507 2.381-11.645 3.572-18.417 3.572zM277.721 471.727h-36.275l-6.92 16.741h-18.527l34.823-78.129h17.858l34.935 78.129h-18.974l-6.92-16.741zm-5.693-13.729l-12.389-29.912-12.389 29.912h24.778zM370.801 488.468l-15.068-21.764h-16.63v21.764h-18.081v-78.129h33.819c6.92 0 12.909 1.154 17.969 3.46 5.134 2.307 9.078 5.581 11.831 9.822 2.753 4.242 4.13 9.264 4.13 15.068s-1.414 10.827-4.241 15.068c-2.754 4.167-6.697 7.366-11.831 9.599l17.523 25.112h-19.421zm-.335-49.779c0-4.39-1.413-7.738-4.241-10.045-2.827-2.381-6.957-3.572-12.389-3.572h-14.733v27.234h14.733c5.432 0 9.562-1.191 12.389-3.572 2.828-2.381 4.241-5.729 4.241-10.045z" />
          <path fill="#FFC800" d="M41.717 5.908C42.75 2.726 45.715.572 49.06.572H130.8c2.623 0 4.482 2.56 3.672 5.054l-42.503 130.81H4.619c-2.622 0-4.482-2.559-3.671-5.054L41.717 5.908zM91.969 136.436L36.342 307.638c-.81 2.495 1.049 5.054 3.672 5.054h81.739c3.345 0 6.31-2.154 7.344-5.336L182.99 141.49c.81-2.494-1.049-5.054-3.672-5.054h-87.35zM227.043 5.908c1.034-3.182 3.999-5.336 7.344-5.336h87.053c51.177 0 77.567 44.062 64.029 88.128-5.538 18.027-13.76 44.042-21.544 68.493-12.788 40.175-50.15 67.371-92.312 67.371h-17.638c-2.623 0-4.483-2.559-3.672-5.054l40.86-125.756c.811-2.494-1.049-5.054-3.672-5.054h-82.034c-2.623 0-4.483-2.56-3.672-5.054l25.258-77.738z" />
        </svg>
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

  svg {
    width: 108px;
    height: auto;
  }
`;