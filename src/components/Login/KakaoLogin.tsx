/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import ReactKakaoLogin from 'react-kakao-login';


interface KakaoLoginProps {
  onLoginKakao: (result: any) => void;
  onClick: () => void;
}

export default function KakaoLogin(props: KakaoLoginProps): JSX.Element {
  const { onLoginKakao, onClick } = props;
  return <ReactKakaoLogin
    token={process.env.REACT_APP_KAKAO_LOGIN_KEY || ''}
    onSuccess={result => onLoginKakao(result)}
    onFail={(result: any) => console.log(result)}
    render={() => (
      <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566815760/noticon/s1118wnuadritgbmm9by.png" onClick={onClick}/>
    )}
  />;
}