/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import _Page from './BasePage';
import { colors, constants } from '../styles';
import News from '../components/News';
import _MenuBar from '../components/MenuBar';
import Loader from '../components/Loader';
import APIS from '../apis';
import { useStore, observer } from '../stores';

const NewsPage: React.FC = () => {
  const { ui } = useStore();
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const { data: { ok, news } } = await APIS.news.list();
      if (ok) {
        setNews(news);
      }
    })();
  }, [])

  React.useEffect(() => { ui.scrollableElementSelector = `.NewsList`; }, [])

  return (
    <Page>
      <Header >뉴스룸</Header>
      <Content isMobile={ui.queryMatch.Mobile}>
        {news.length > 0 && (
          <News news={news} />
        )}
        {news.length === 0 && <Loader size="32px" />}
      </Content>
      {ui.queryMatch.Mobile && <MenuBar />}
    </Page>
  )
}

export default observer(NewsPage);

const Page = styled(_Page)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 0 20px;
  font-size: 19px;
  font-weight: bold;
  color: ${colors.black22};
  background-color: ${colors.white};
`;

const Content = styled.div<{ isMobile: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${p => p.isMobile && css`
    padding: 0 0 56px 0;
  `};
`

const MenuBar = styled(_MenuBar)`
  position: fixed;
  bottom: ${constants.safeBottom};
  left: 0;
`;