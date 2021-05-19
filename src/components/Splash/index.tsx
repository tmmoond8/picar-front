import styled from '@emotion/styled';
import React from 'react';
import splashSVG from './splash-owwners.svg';

const Spash: React.FC<{ shown: boolean }> = ({ shown }) => {

  return (
    <>
      {shown && (
        <SvgWrapper>
          <img src={splashSVG} />
        </SvgWrapper>
      )}
    </>
  )
}

export default Spash;

const SvgWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 100000;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
