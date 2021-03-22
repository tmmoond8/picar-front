/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import APIS from '../apis';
import env from '../env';
import storage from '../modules/localStorage';
import { Profile as UserProfile } from '../types/User';
import { SignUpUser, Profile } from '../types/User';
import { useModal } from '../components/Modal';
import { useStore } from '../stores';
import OwwnersLogo from '../resources/images/owwners-logo.png';
import SignUp from '../components/SignUp';

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

const LoginPage = () => {
  const { user, ui } = useStore();
  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const history  = useHistory();

  ui.setHeaderNone();
  const modal = useModal();
  const handleSetUserProfile = (profile: UserProfile) => {
    user.setProfile(profile);
  };

  const handleClose = React.useCallback(() => {
    modal.close();
    setTimeout(() => {
      history.replace('/', false);
    }, 200)
  }, [])

  const handleSignUp = React.useCallback(
    (user: SignUpUser) => {
      modal.open({
        title: ' 회원가입',
        isFull: true,
        noHeader: true,
        noBlur: true,
        contents: (
          <SignUpWithDelay
            {...user}
            onClose={handleClose}
            onSetUserProfile={handleSetUserProfile}
          />
        ),
      });
    },
    [modal],
  );

  async function handleSaveUser(result: any, tokenData: any) {
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname, profile_image_url, thumbnail_image_url },
      },
    } = result;
    try {
      const {
        data: { data },
      } = await APIS.auth.check(id, 'kakao');
      if (data) {
        handleSetUserProfile(data);
        return;
      }
    } catch (error) {
      return;
    }

    const user: Partial<SignUpUser> = {
      email,
      snsId: id.toString(),
      name: nickname,
      thumbnail: thumbnail_image_url,
      profileImage: profile_image_url,
      provider: 'kakao',
    };
    handleSignUp({...user, ...tokenData});
  };
  
  React.useEffect(() => {
    (async () => {
      if (code) {
        try {
          const call = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${env.REACT_APP_KAKAO_USER_API_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&code=${code}`;
          const { data: { access_token, refresh_token } } = await axios.post(call)
          const { data } = await APIS.auth.kakaoLogin({
            accessToken: access_token,
            refreshToken: refresh_token,
          })
          storage.clearUUID();
          if (data.code) {
            setTimeout(() => {
              window.location.replace('/');
            }, 50)
          } else {
            handleSaveUser(data, {
              accessToken: access_token,
              refreshToken: refresh_token,
            });
          }
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
