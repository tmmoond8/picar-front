/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Plugins } from '@capacitor/core';
import storage from '../../modules/localStorage';
import { isHybrid } from '../../modules/crossPlatform';
import { useModal } from '../Modal';
import env from '../../env';

const { Browser } = Plugins;

interface AppleLoginProps {
  onClose: () => void;
}

export default function AppleLogin(props: AppleLoginProps) {
  const { onClose } = props;
  const modal = useModal();

  const handleAppleLogin = React.useCallback(() => {
    onClose();
    const uuid = 'apple-' + Math.random().toString(32).split('.')[1];
    storage.setUUID(uuid);
    setTimeout(() => {
      if (isHybrid()) {
        Browser.open({
          url: `${env.REACT_APP_APPLE_LOGIN_BRIDGE_URL}?uuid=${uuid}`,
          windowName: 'kakaoLoginPage',
        });
      } else {
        const config = {
          client_id: 'com.tmmoond8.picar-web', // This is the service ID we created.
          redirect_uri: env.APPLE_LOGIN_REDIRECT_URL, // As registered along with our service ID
          response_type: 'code id_token',
          state: 'origin:web', // Any string of your choice that you may use for some logic. It's optional and you may omit it.
          scope: 'name email', // To tell apple we want the user name and emails fields in the response it sends us.
          response_mode: 'form_post',
          m: 11,
          v: '1.5.4',
        };
        const queryString = Object.entries(config)
          .map(([key, value = '']) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;
      }
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  return (
    <AppleIcon
      onClick={handleAppleLogin}
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 24 24"
    >
      <path d="M0 0v24h24v-24h-24zm15.185 3c.206 1.871-1.465 3.823-3.206 3.687-.215-1.634 1.322-3.611 3.206-3.687zm-.227 15.979c-1.072.021-1.417-.635-2.642-.635-1.225 0-1.607.616-2.621.656-1.715.065-4.361-3.886-4.361-7.331 0-3.165 2.205-4.734 4.132-4.762 1.033-.019 2.009.696 2.64.696.633 0 1.818-.86 3.064-.733.521.021 1.985.21 2.926 1.585-2.495 1.627-2.106 5.032.571 6.284-.524 1.519-2.093 4.211-3.709 4.24z" />
    </AppleIcon>
  );
}

const AppleIcon = styled.svg`
  border-radius: 22px;
`;
