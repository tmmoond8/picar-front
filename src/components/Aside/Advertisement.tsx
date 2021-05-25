/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';


const Advertisement: React.FC<{}> = () => {

  return (
    <AdLink target="_blank">
      <Img src="https://static.owwners.com/dhfi7dxpu/image/upload/v1614515292/owner/owwners-ad_log4vn.png" alt="picar banner" />
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

const Img = styled.img`
  width: 100%;
  height: auto;
`;