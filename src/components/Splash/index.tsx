import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import splashSVG from './splash-owwners.svg';
import env from '../../env';

const Spash: React.FC<{ shown: boolean }> = ({ shown }) => {
  const [hide, setHide] = React.useState(false);
  const isDev = env.REACT_APP_DEV === 'develop';

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHide(!shown);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [shown]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 1500);
    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (
    <>
      {!isDev && <SvgWrapper hide={hide}>
        <img src={splashSVG} />
      </SvgWrapper>}
    </>
  )
}

export default Spash;

const SvgWrapper = styled.div<{ hide: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background-color: white;
  z-index: 1000000;
  opacity: 1;
  ${p => p.hide && css`
    z-index: -100000;
    opacity: 0;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`