import React from 'react';
import { useHistory } from 'react-router-dom';
import APIS from '../apis';
import storage from '../modules/localStorage';
import { SignUpUser, Profile, KakaoUser } from '../types/User';
import { useModal } from '../components/Modal';
import { useStore } from '../stores';
import SignUp from '../components/SignUp';

interface LoginBoxProps {
  onClose: () => void;
  onSetUserProfile: (profile: Profile) => void;
}

interface KakaoLogin {
  accessToken: string;
  refreshToken: string;
  handleSignIn: (user: Profile) => void;
  handleSignUp: (d: any) => void;
}

export const kakaoLogin = async (params: KakaoLogin) => {
  const { accessToken, refreshToken, handleSignIn, handleSignUp } = params;
  const tokens = { accessToken, refreshToken };
  storage.clearUUID();
  const { data } = await APIS.auth.kakaoLogin(tokens);
  if ('code' in data) {
    setTimeout(() => {
      window.location.replace('/');
    }, 50)
  }
  const kakaoUser = data as KakaoUser;
  const {
    data: { data: userProfile },
  } = await APIS.auth.check(kakaoUser.id, 'kakao');
  if (userProfile) {
    handleSignIn(userProfile);
    return;
  }

  const user: Partial<SignUpUser> = {
    email: kakaoUser.kakao_account.email,
    snsId: kakaoUser.id.toString(),
    name: kakaoUser.kakao_account.profile.nickname,
    thumbnail: kakaoUser.kakao_account.profile.thumbnail_image_url,
    profileImage: kakaoUser.kakao_account.profile.profile_image_url,
    provider: 'kakao',
  };

  handleSignUp({ ...user, ...tokens});
}

export const useKakaoLogin = () => {
  const { user } = useStore();
  const modal = useModal();
  const history  = useHistory();
  const handleClose = React.useCallback(() => {
    modal.close();
    setTimeout(() => {
      history.replace('/', false);
    }, 200)
  }, [])

  const handleSignIn = React.useCallback((profile: Profile) => {
    user.setProfile(profile);
  }, [user]);

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
    [modal],
  );

  return (accessToken: string, refreshToken: string) => kakaoLogin({
    accessToken, refreshToken, handleSignUp, handleSignIn
  })
}