/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import storage from '../modules/localStorage';
import env from '../env';

const KakaoLoginBridge: React.FC = () => {
    const location = useLocation();
    const { uuid } = queryString.parse(location.search);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${env.REACT_APP_KAKAO_LOGIN_KEY}&redirect_uri=${env.REACT_APP_LOGIN_URL}&response_type=code`
    //     }, 150)
    // }, [])

    return (
        <p>no use</p>
    )
}

export default KakaoLoginBridge;