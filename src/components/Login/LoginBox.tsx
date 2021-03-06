/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';
import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';
import AppleLogin from './AppleLogin';

const LoginBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Box>
      <GuideText>
        간편하게 로그인하고 <br /> 오너들과 이야기를 나눠보세요.
      </GuideText>
      <LoginButtons>
        <li>
          <KakaoLogin onClose={onClose} />
        </li>
        <li className="naver-login">
          <NaverLogin onClose={onClose} />
        </li>
        <li>
          <AppleLogin onClose={onClose} />
        </li>
      </LoginButtons>
      <PolicyBox>
        <a href="/term" target="_blank">
          서비스 이용약관
        </a>
        <a href="/privacyPolicy" target="_blank">
          개인정보 처리방침
        </a>
      </PolicyBox>
    </Box>
  );
};

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
  li + li {
    margin-left: 24px;
  }
`;

const GuideText = styled.h2`
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.5px;
  text-align: center;
`;

const PolicyBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 16px 0;
  color: ${colors.black77};
`;
