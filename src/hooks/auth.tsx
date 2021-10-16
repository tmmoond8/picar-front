import React from 'react';
import axios from 'axios';
import APIS from '../apis';
import storage from '../modules/localStorage';
import { SignUpUser, Profile, KakaoUser, NaverUser } from '../types/User';
import { useModal } from '../components/Modal';
import { useStore } from '../stores';
import SignUp from '../components/SignUp';
import env from '../env';

interface LoginBoxProps {
  onClose: () => void;
  onSetUserProfile: (profile: Profile) => void;
}

interface LoginParams {
  accessToken: string;
  refreshToken: string;
  handleSignIn: (user: Profile) => void;
  handleSignUp: (d: any) => void;
}

export type LoginType = 'naver' | 'kakao' | 'apple';

export const kakaoLogin = async (params: LoginParams) => {
  const { accessToken, refreshToken, handleSignIn, handleSignUp } = params;
  const tokens = { accessToken, refreshToken };
  storage.clearUUID();
  const { data } = await APIS.auth.kakaoLogin(tokens);
  if ('profile' in data) {
    storage.setToken(data.token);
    return setTimeout(() => {
      window.location.replace('/');
    }, 50);
  }
  if ('kakaoUser' in data) {
    const kakaoUser = data.kakaoUser as KakaoUser;
    const {
      data: { data: userProfile },
    } = await APIS.auth.check(kakaoUser.id, 'kakao');
    if (userProfile) {
      handleSignIn(userProfile);
      return;
    }

    const user: Partial<SignUpUser> = {
      email: kakaoUser.kakao_account?.email,
      snsId: kakaoUser.id.toString(),
      name: kakaoUser.kakao_account?.profile?.nickname,
      thumbnail: kakaoUser.kakao_account?.profile?.thumbnail_image_url,
      profileImage: kakaoUser.kakao_account?.profile?.profile_image_url,
      provider: 'kakao',
    };

    handleSignUp({ ...user, ...tokens });
  }
};

export const naverLogin = async (params: LoginParams) => {
  const { accessToken, refreshToken, handleSignIn, handleSignUp } = params;
  const tokens = { accessToken, refreshToken };
  storage.clearUUID();
  const { data } = await APIS.auth.naverLogin(tokens);
  if ('profile' in data) {
    storage.setToken(data.token);
    return setTimeout(() => {
      window.location.replace('/');
    }, 50);
  }
  if ('naverUser' in data) {
    const naverUser = data.naverUser as NaverUser;
    const {
      data: { data: userProfile },
    } = await APIS.auth.check(naverUser.id, 'naver');
    if (userProfile) {
      handleSignIn(userProfile);
      return;
    }

    const user: Partial<SignUpUser> = {
      email: naverUser.email,
      snsId: naverUser.id.toString(),
      name: naverUser.nickname,
      thumbnail: naverUser.profile_image,
      profileImage: naverUser.profile_image,
      provider: 'naver',
    };

    handleSignUp({ ...user, ...tokens });
  }
};

export const appleLogin = async (params: LoginParams) => {
  const { accessToken, refreshToken, handleSignIn, handleSignUp } = params;
  const tokens = { accessToken, refreshToken };
  storage.clearUUID();
  const { data } = await APIS.auth.appleLogin(tokens);
  if ('profile' in data) {
    storage.setToken(data.token);
    return setTimeout(() => {
      window.location.replace('/');
    }, 50);
  }
  if ('user' in data) {
    const appleUser = (data as any).user;
    const {
      data: { data: userProfile },
    } = await APIS.auth.check(appleUser.id, 'apple');
    if (userProfile) {
      handleSignIn(userProfile);
      return;
    }

    const user: Partial<SignUpUser> = {
      email: appleUser.email,
      snsId: appleUser.id.toString(),
      provider: 'apple',
    };

    handleSignUp({ ...user, ...tokens });
  }
};

export const useLogin = () => {
  const { user, util } = useStore();
  const modal = useModal();
  const handleClose = React.useCallback(() => {
    modal.close();
    setTimeout(() => {
      // FIXME 리다이렉션 동작 체킹
      // window.location.href = '/';
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = React.useCallback(
    (profile: Profile) => {
      user.setProfile(profile);
    },
    [user],
  );

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
            onSetUserProfile={handleSignIn}
          />
        ),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modal],
  );

  return {
    login: (
      provider: 'naver' | 'kakao' | 'apple',
      accessToken: string,
      refreshToken: string,
    ) => {
      if (provider === 'kakao') {
        kakaoLogin({
          accessToken,
          refreshToken,
          handleSignUp,
          handleSignIn,
        });
      }
      if (provider === 'naver') {
        naverLogin({
          accessToken,
          refreshToken,
          handleSignUp,
          handleSignIn,
        });
      }
      if (provider === 'apple') {
        appleLogin({
          accessToken,
          refreshToken,
          handleSignUp,
          handleSignIn,
        });
      }
    },
    getToken: (provider: 'naver' | 'kakao' | 'apple', code: string) => {
      if (provider === 'kakao')
        return axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${env.REACT_APP_KAKAO_USER_API_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&code=${code}`,
        );
      if (provider === 'naver') return APIS.auth.getNaverToken(code);
      if (provider === 'apple') return APIS.auth.getAppleToken(code);
      return Promise.resolve({ data: {} });
    },
  };
};
