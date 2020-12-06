/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';
import { SignUpUser, Profile } from '../../types/User';
import BottomSheet from '../BottomSheet';
import SignUp from '../SignUp';

interface LoginBoxProps {
  onClose: () => void;
  onSetUserProfile: (profile: Profile) => void;
}

const SignUpWithDelay = (props: LoginBoxProps & SignUpUser) => {
  const [isShown, setIsShown] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return <React.Fragment>{isShown && <SignUp {...props} />}</React.Fragment>;
};

export default function LoginBox(props: LoginBoxProps): JSX.Element {
  const { onClose, onSetUserProfile } = props;
  const bottomSheet = BottomSheet.useBottomSheet();

  const handleSignUp = React.useCallback(
    (user: SignUpUser) => {
      onClose();
      setTimeout(() => {
        bottomSheet.open({
          title: ' 회원가입',
          headerType: 'none',
          isFull: true,
          contents: (
            <SignUpWithDelay
              {...user}
              onClose={bottomSheet.close}
              onSetUserProfile={onSetUserProfile}
            />
          ),
        });
      }, 300);
    },
    [bottomSheet, onClose, onSetUserProfile],
  );

  const handleSetUserProfile = React.useCallback(
    (profile: Profile) => {
      onClose();
      onSetUserProfile(profile);
    },
    [onClose, onSetUserProfile],
  );

  return (
    <Box>
      <GuideText>
        간편하게 로그인하고 <br /> 오너들과 이야기를 나눠보세요.
      </GuideText>
      <LoginButtons>
        <li>
          <KakaoLogin
            onSignUp={handleSignUp}
            onSetUserProfile={handleSetUserProfile}
          />
        </li>
        <li className="naver-login">
          <NaverLogin
            onSignUp={handleSignUp}
            onSetUserProfile={handleSetUserProfile}
          />
        </li>
      </LoginButtons>
    </Box>
  );
}

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
    filter: opacity(0.5);
  }
`;

const GuideText = styled.h2`
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.5px;
  text-align: center;
`;
