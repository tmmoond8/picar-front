/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Icon from '../Icon';
import { colors } from '../../styles';

const DownloadApp: React.FC<{}> = () => {

  return (
    <StyledDownloadApp>
      <Header>App 다운로드</Header>
      <Body>
        <Link >
          <Icon icon="appStore" size="18px" color={colors.black66}/>
          App Store
        </Link>
        <Link >
          <Icon icon="googlePlay" size="18px" color={colors.black66}/>
          Google Play
        </Link>
      </Body>
    </StyledDownloadApp>
  );
};

export default DownloadApp;

const StyledDownloadApp = styled.div`
  margin-top: 16px;
  background-color: ${colors.white};
`;

const Header =  styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 12px 0 18px;
  box-shadow: 0 1px 0 0 ${colors.blackEB};

  h3 {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.25px;
    color: #222222;
  }
`;

const Body = styled.div`
  padding: 12px 16px;
  a + a {
    margin-top: 8px;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 12px 16px 14px 16px;
  color: ${colors.black66};
  font-weight: 500;
  border-radius: 4px;
  background-color: ${colors.blackF5F6F7};

  .icon {
    margin-right: 12px;
  }
`;