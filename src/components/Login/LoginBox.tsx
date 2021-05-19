/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';

const LoginBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Box>
      <GuideText>
        간편하게 로그인하고 <br /> 오너들과 이야기를 나눠보세요.
      </GuideText>
      <LoginButtons>
        <li>
          <KakaoLogin
            onClose={onClose}
          />
        </li>
        <li className="naver-login">
          <NaverLogin onClose={onClose} />
        </li>
      </LoginButtons>
    </Box>
  );
}

export default LoginBox;

const Box = styled.div`
  padding: 29px 42px;
`;

const LoginButtons = styled.ol`
  display: flex;
  justify-content: center;
  padding: 40px 0 30px;
  li {
    width: 60px;
    height: 60px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 22.5px;
    }
  }
  .naver-login {
    margin-left: 24px;
  }
`;

const GuideText = styled.h2`
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.5px;
  text-align: center;
`;
