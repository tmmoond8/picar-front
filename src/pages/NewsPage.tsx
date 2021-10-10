/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { NewsFeed } from '../types/News';
import _Page from './BasePage';
import { colors, constants } from '../styles';
import News from '../components/News';
import _MenuBar from '../components/MenuBar';
import Loader from '../components/Loader';
import APIS from '../apis';
import { useStore, observer } from '../stores';

const NewsPage: React.FC = () => {
  const { ui } = useStore();
  const [news, setNews] = React.useState<NewsFeed[]>([]);
  React.useEffect(() => {
    (async () => {
      const {
        data: { ok, news },
      } = await APIS.news.list();
      if (ok) {
        const newsFeed = news.reduce((accum: NewsFeed[], item) => {
          return accum.find(
            ({ id, title }) => item.id === id || title === item.title,
          )
            ? accum
            : accum.concat(item);
        }, []);
        setNews(newsFeed);
      }
    })();
  }, []);

  React.useEffect(() => {
    ui.scrollableElementSelector = '.NewsList';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <Header>뉴스</Header>
      <Content isMobile={ui.queryMatch.Mobile}>
        {news.length > 0 && <News news={news} />}
        {news.length === 0 && <Loader size="32px" />}
      </Content>
      {ui.queryMatch.Mobile && <MenuBar />}
    </Page>
  );
};

export default observer(NewsPage);

const Page = styled(_Page)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  padding: 0 20px;
  font-size: 17px;
  font-weight: 500;
  color: ${colors.black22};
  background-color: ${colors.white};
`;

const Content = styled.div<{ isMobile: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${(p) =>
    p.isMobile &&
    css`
      padding: 0 0 56px 0;
    `};
`;

const MenuBar = styled(_MenuBar)`
  position: fixed;
  bottom: ${constants.safeBottom};
  left: 0;
`;
