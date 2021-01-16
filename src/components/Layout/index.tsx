/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import LoungeSelector from './LoungeSelector';
import MyActivity from './MyActivity';
import PopularArticles from './PopularArticles';
import DesktopHeader from '../Header/DesktopHeader';
import MenuBar from '../MenuBar';

const GAP = 24;

const Tablet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <DesktopHeader />
      <Body>
        <Contents>{children}</Contents>
        <Right>
          <FixedBox>
            <PopularArticles />
          </FixedBox>
        </Right>
      </Body>
    </Layout>
  );
};

const Desktop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <StyledMenuBar />
      <Body>
        <Left>
          <FixedBox>
            <LoungeSelector />
            <MyActivity />
          </FixedBox>
        </Left>
        <Contents>{children}</Contents>
        <Right>
          <FixedBox>
            <PopularArticles />
          </FixedBox>
        </Right>
      </Body>
    </Layout>
  );
};
export default {
  Tablet,
  Desktop,
};

const Layout = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: ${60 + GAP}px ${GAP}px ${GAP}px ${GAP}px;
  background-color: ${colors.blackF5F6F7};
  overflow-y: hidden;
`;

const Left = styled.aside`
  width: 300px;
  height: 600px;
  margin: 0 ${GAP}px 0 0;

  .MyActivity {
    bottom: 0;
    margin: 12px 0 0 0;
  }
`;

const Right = styled.div`
  width: 300px;
  height: 600px;
  margin: 0 0 0 ${GAP}px;

  .MyActivity {
    bottom: 0;
    margin: 12px 0 0 0;
  }
`;

const StyledMenuBar = styled(MenuBar)`
  top: 0;
  height: 60px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ul {
    width: 332px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 320px;
  max-width: 540px;
  background-color: ${colors.white};
`;

const FixedBox = styled.div`
  position: fixed;
`;
