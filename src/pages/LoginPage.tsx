/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import APIS from '../apis';
import env from '../env';
import { Profile as UserProfile } from '../types/User';
import LoginBox from '../components/Login/LoginBox';
import { useBottomSheet } from '../components/BottomSheet';
import { useStore, observer } from '../stores';
import OwwnersLogo from '../resources/images/owwners-logo.png';
import UtilsStore from '../stores/utilStore';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default observer(function ProfilePage(): JSX.Element {
  const { user, ui, util } = useStore();
  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const history  = util.useHistory();

  ui.setHeaderNone();
  const bottomSheet = useBottomSheet();
  const handleSetUserProfile = (profile: UserProfile) => {
    // user.profile = profile;
    user.setProfile(profile);
  };
  
  React.useEffect(() => {
    (async () => {
      if (code) {
        try {
          const { data: { access_token, refresh_token } } = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${env.REACT_APP_KAKAO_USER_API_KEY}&redirect_uri=${env.REACT_APP_NAVER_LOGIN_CALLBACK_URL}&code=${code}`)
          const { data } = await APIS.auth.kakaoLogin({
            accessToken: access_token,
            refreshToken: refresh_token,
          })
          if (data.code) {
            // TODO replace reaload 조합이 아니고 goBack 으로 하되 사용자 정보가 셋업되도록...
            history.replace('/');
            setTimeout(() => {
              window.location.reload();
            }, 50)
          } else {
            // TODO 로그인이 되어 있지 않으면 회원가입 하도록 처리
          }
        } catch (error) {
          console.error('kakao login error', error);
        }
      }
    })();
  }, [code])

  return (
    <Page>
      <LoginBox
        onClose={bottomSheet.close}
        onSetUserProfile={handleSetUserProfile}
      />
      <FullLoading>
        <img src={OwwnersLogo} />
      </FullLoading>
    </Page>
  );
});

const FullLoading = styled.div`
  display: flex;
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
`;
