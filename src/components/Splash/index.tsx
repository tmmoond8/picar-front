import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import splashSVG from './splash-owwners.svg';
import env from '../../env';
import { useStore, observer } from '../../stores';

const Spash: React.FC = () => {
  const [hide, setHide] = React.useState(false);
  const { ui } = useStore();
  const isDev = env.REACT_APP_DEV === 'develop';

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (
    <React.Fragment>
      {!isDev && <SvgWrapper hide={hide}>
        <img src={splashSVG} />
      </SvgWrapper>}
    </React.Fragment>
  )
}

export default observer(Spash);

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