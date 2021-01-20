/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { ReactComponent as AdvertisementSVG } from './advertisement.svg';

const Advertisement: React.FC<{}> = () => {

  return (
    <AdLink target="_blank">
      <AdvertisementSVG />
    </AdLink>
  );
};

export default Advertisement;

const AdLink = styled.a`
  display: block;
  width: 264px;
  height: 128px;
  margin-top: 16px;
  cursor: pointer;
`;