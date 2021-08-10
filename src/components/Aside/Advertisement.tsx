/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';


const Advertisement: React.FC<{}> = () => {

  return (
    <AdLink target="_blank">
      <Img src="https://static.picar.kr/dhfi7dxpu/image/upload/v1622347340/picar/pc-card-r-ad_tbsfyv.png" alt="picar banner" />
    </AdLink>
  );
};

export default Advertisement;

const AdLink = styled.a`
  display: block;
  width: 328px;
  height: 77px;
  margin-top: 16px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;