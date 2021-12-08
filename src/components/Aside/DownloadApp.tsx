/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Icon from '../Icon';
import { toast } from 'react-toastify';
import { colors } from '../../styles';

const DownloadApp: React.FC = () => {
  return (
    <StyledDownloadApp>
      <Header>
        <h3>앱 다운로드</h3>
      </Header>
      <Body>
        <Link
          className="AppStoreLink"
          href="https://apps.apple.com/kr/app/%ED%94%BC%EC%B9%B4-%EC%A0%84%EA%B8%B0%EC%B0%A8-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0/id1590699820?l=en"
          target="_blank"
        >
          <Icon icon="appStore" size="18px" color={colors.black66} />
          App Store
        </Link>
        <Link
          className="PlayStoreLink"
          href="https://play.google.com/store/apps/details?id=com.tmmoond8.picar"
          target="_blank"
        >
          <Icon icon="googlePlay" size="18px" color={colors.black66} />
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 12px 0 18px;
  box-shadow: 0 1px 0 0 ${colors.blackEB};

  h3 {
    font-size: 16px;
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
  .Icon.appStore {
    cursor: pointer;
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
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${colors.blackD9};
  }

  .Icon {
    margin-right: 12px;
  }
`;
