/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { constants } from '../styles';
import { useLogin, LoginType } from '../hooks/auth';

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
          const { data } = await getToken(state as LoginType, code as string);
          const { access_token, refresh_token } = data;
          login(state as LoginType, access_token, refresh_token);
        } catch (error) {
          alert(`login error ${state} ${JSON.stringify(error)}`);
          console.error('login error', error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <Page>
      <FullLoading>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="320"
          height="320"
          fill="none"
          viewBox="0 0 320 320"
        >
          <path fill="#fff" d="M0 0H320V320H0z" />
          <path
            fill="url(#paint0_linear)"
            d="M95.746 149.938H84.131c-.959 0-1.56-1.038-1.081-1.87l15.276-26.567c.534-.928 1.524-1.501 2.595-1.501h20.062c.959 0 1.56 1.038 1.082 1.869l-12.697 22.081h11.615c.959 0 1.56 1.038 1.082 1.869l-15.276 26.567c-.535.929-1.524 1.502-2.596 1.502H84.131c-.959 0-1.56-1.038-1.081-1.869l12.696-22.081z"
          />
          <path
            fill="#333"
            stroke="#333"
            strokeWidth=".249"
            d="M142.059 127.075l-.119-.022-.025.118-.935 4.287-.022.1.094.041c.925.407 1.977.739 3.157.997 1.135.249 2.22.412 3.255.489v22.788c-1.017-.035-2-.07-2.949-.105-.988-.037-1.902-.092-2.743-.165l-.135-.011v5.191l.107.016c1.029.147 2.204.275 3.525.385h0l.004.001c1.319.073 2.712.146 4.178.219l.004.001 4.507.11H158.473c1.467 0 2.971-.019 4.511-.055 1.54-.037 3.044-.092 4.511-.166 1.467-.073 2.861-.165 4.182-.275 1.321-.11 2.496-.238 3.525-.385l.107-.016v-5.191l-.135.011c-.842.074-1.793.147-2.854.22-.986.035-2.005.087-3.058.156v-22.72h4.673v-5.472h-25.247c-.986 0-2.101-.036-3.344-.109-1.205-.11-2.3-.256-3.285-.438zm41.316 40.95h.125v-42.162h-6.736v42.162h6.611zm9.555-41.115l-.119-.022-.026.118-.934 4.288-.022.098.093.042c1.073.481 2.311.85 3.711 1.108 1.399.258 2.689.387 3.871.387h11.309v9.426h-19.13V147.826h19.126c-.036 1.136-.09 2.356-.161 3.662v.003c-.036 1.354-.109 2.745-.219 4.172v.003c-.074 1.428-.165 2.838-.275 4.23-.11 1.391-.238 2.672-.384 3.842l-.016.126.127.014 6.321.659.121.013.016-.121c.183-1.431.349-2.972.495-4.622.147-1.651.275-3.319.385-5.006h0c.11-1.723.184-3.392.22-5.006.074-1.65.11-3.154.11-4.512v-17.826h-17.99c-.986 0-2.101-.036-3.344-.109-1.206-.11-2.301-.256-3.285-.438zm45.234 14.8v-.125h-7.366v-15.722h-6.737v42.162h6.737v-20.968h7.366v-5.347zm-75.638-8.616v22.949H154.2v-22.949h8.326z"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="91.117"
              x2="114.873"
              y1="119.751"
              y2="175.021"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD000" />
              <stop offset="1" stopColor="#FB0" />
            </linearGradient>
          </defs>
        </svg>
      </FullLoading>
    </Page>
  );
};

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
    width: 320px;
    height: auto;
  }
`;
