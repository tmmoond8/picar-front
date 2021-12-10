/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Browser } from '@capacitor/browser';
import storage from '../../modules/localStorage';
import { isHybrid } from '../../modules/crossPlatform';
import { useModal } from '../Modal';
import env from '../../env';

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
          redirect_uri: env.REACT_APP_APPLE_LOGIN_REDIRECT_URL, // As registered along with our service ID
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
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" fill="black" />
      <g clip-path="url(#clip0_439_15993)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36.8306 11C36.9836 12.9868 36.3517 14.9547 35.0691 16.4857C33.8248 18.0247 31.9394 18.9111 29.9536 18.8908C29.8273 16.9612 30.4776 15.0608 31.7612 13.6082C33.0611 12.1359 34.8711 11.2046 36.8306 11ZM43.1107 22.6743C40.8265 24.0708 39.4208 26.5334 39.3863 29.1995C39.3896 32.2159 41.2062 34.9381 44 36.1131C43.4627 37.8488 42.6528 39.4891 41.6002 40.9732C40.1867 43.0758 38.7046 45.1299 36.3523 45.1679C35.2336 45.1936 34.4784 44.8737 33.6915 44.5403C32.8707 44.1926 32.0154 43.8303 30.6769 43.8303C29.2575 43.8303 28.3639 44.2043 27.502 44.565C26.7572 44.8767 26.0361 45.1784 25.0199 45.2203C22.7797 45.3028 21.0676 42.9762 19.6027 40.8934C16.6748 36.6398 14.3949 28.906 17.4514 23.6438C18.8868 21.0791 21.5704 19.4516 24.5206 19.3568C25.7912 19.3308 27.0104 19.8178 28.0793 20.2447C28.8967 20.5712 29.6263 20.8626 30.2237 20.8626C30.7488 20.8626 31.458 20.5827 32.2845 20.2565C33.5865 19.7427 35.1795 19.114 36.8029 19.2834C39.3255 19.3619 41.6631 20.6186 43.1107 22.6743Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_439_15993">
          <rect
            width="28"
            height="34.2222"
            fill="white"
            transform="translate(16 11)"
          />
        </clipPath>
      </defs>
    </AppleIcon>
  );
}

const AppleIcon = styled.svg`
  border-radius: 22px;
`;
