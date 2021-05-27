/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import LoungeSelector from './LoungeSelector';
import Icon from '../Icon';
import MyActivity from './MyActivity';
import Aside from '../Aside';
import { useStore, observer } from '../../stores';
import DesktopHeader from '../DesktopHeader';
import MenuBar from '../MenuBar';

const GAP = 24;

const Tablet: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
  const { ui } = useStore();
  const handleClickGoTop = ui.useTopButton();
  return (
    <Layout className="TabletLayout">
      <DesktopHeader />
      <Body className="TabletBody">
        <Contents className="TabletContents">
          <ButtonGoTop className="GoTop" onClick={handleClickGoTop} notDesktop={!ui.queryMatch.Desktop}>
            <Icon icon="back" size="24px" color={colors.black99} />
          </ButtonGoTop>
          {children}
        </Contents>
        <Right className="TabletRight">
          <Aside.PopularArticles />
          <Aside.Advertisement />
          <Aside.DownloadApp />
          <Aside.Copyrights />
        </Right>
      </Body>
    </Layout>
  );
});

const Desktop: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
  const { ui, article } = useStore();
  const handleClickGoTop = React.useCallback(() => {
    const currentList = document.querySelector(`.ArticleList[data-id="${article.selectedGroup}"]`);
    if (currentList) {
      currentList.scrollTop = 0;
    }
  }, [article.selectedGroup])
  return (
    <Layout>
      <StyledMenuBar />
      <Body>
        {false && <Left>
          <FixedBox>
            <LoungeSelector />
            <MyActivity />
          </FixedBox>
        </Left>}
        <Contents>
          <ButtonGoTop className="GoTop" onClick={handleClickGoTop} notDesktop={!ui.queryMatch.Desktop}>
            <Icon icon="back" size="24px" color={colors.black99} />
          </ButtonGoTop>
          {children}
        </Contents>
        <Right>
          <FixedBox>
            <Aside.PopularArticles />
            <Aside.Advertisement />
            <Aside.DownloadApp />
            <Aside.Copyrights />
          </FixedBox>
        </Right>
      </Body>
    </Layout>
  );
});
export default {
  Tablet,
  Desktop,
};

const Layout = styled.div`
  height: 100%;
  padding: ${60 + GAP}px ${GAP}px 0 ${GAP}px;
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
  width: 264px;
  height: 100%;
  margin: 0 0 0 ${GAP}px;
  overflow-y: auto;
  overflow-x: hidden;

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
  position: relative;
  flex: 1;
  min-width: 320px;
  max-width: 540px;
  .ArticleList {
    background: ${colors.white};
    padding-bottom: ${GAP}px;
    box-shadow: inset 0 -24px ${colors.blackF5F6F7};
  }
  .ArticleCard {
    margin-top: 1px;
    border-bottom: 1px solid ${colors.blackEB};
  }
  .ArticleContainer > *:last-child {
    padding-bottom: ${GAP}px;
    box-shadow: inset 0 -24px ${colors.blackF5F6F7};
  }
`;

const FixedBox = styled.div`
  position: fixed;
`;

const ButtonGoTop = styled.div<{ notDesktop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 40px;
  height: 40px;
  left: -64px;
  bottom: 36px;
  border-radius: 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
  background-color: ${colors.white};
  transition: left 0.5s ease-in-out, opacity 0.5s ease-in-out;
  cursor: pointer;
  z-index: 1000;
  .Icon.back {
    transform: rotate(90deg);
    cursor: pointer;
  }
  ${p => p.notDesktop && css`
    left: 16px;
  `}
`;