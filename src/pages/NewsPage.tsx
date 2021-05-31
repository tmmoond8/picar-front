/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Page from './BasePage';
import { colors } from '../styles';
import News from '../components/News';
import Loader from '../components/Loader';
import APIS from '../apis';

const NewsPage: React.FC = () => {
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const { data: { ok, news } } = await APIS.news.list();
      if (ok) {
        setNews(news);
      }
    })();
  }, [])

  return (
    <Page>
      <Header >뉴스룸</Header>
      {news.length > 0 && (
        <News news={news} />
      )}
      {news.length === 0 && <Loader size="32px" />}
    </Page>
  )
}

export default NewsPage;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  font-size: 19px;
  font-weight: bold;
  color: ${colors.black22};
  background-color: ${colors.white};
`;