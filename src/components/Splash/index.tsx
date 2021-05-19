import styled from '@emotion/styled';
import React from 'react';

const Spash: React.FC<{ shown: boolean }> = ({ shown }) => {
  return (
    <>
      {shown && <SplashImage src="/splash.png" />}
    </>
  )
}

export default Spash;

const SplashImage = styled.img`
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 100000;
`
