/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

const Advertisement: React.FC<{}> = () => {

  return (
    <StyledAdvertisement>
      <Rules>
        <Link>이용약관</Link>
        <Link>개인정보처리방침</Link>
        <Link>광고정보</Link>
      </Rules>
        © 2021 picar, All rights reserved.
    </StyledAdvertisement>
  );
};

export default Advertisement;

const StyledAdvertisement = styled.div`
  margin-top: 16px;
  padding: 8px 0;
  font-size: 12px;
  color: ${colors.black84};
`;

const Rules = styled.div`
  margin-bottom: 7px;
  a + a {
    margin-left: 16px;
  }
`;

const Link = styled.a`
  
`;