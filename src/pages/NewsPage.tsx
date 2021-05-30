/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Page from './BasePage';
import { colors } from '../styles';
import NewsType from '../types/News';
import News from '../components/News';

const news: NewsType[] = [
  {
    id: 12323,
    title: 'asddsad',
    content: 'asdffdsaf',
    publisher: '연합뉴스',
    thumbnail: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622186006/noticon/qwvot1hwgwh0shnzumww.png',
    createAt: '2021-05-30T04:43:26.964Z',
  },
  {
    id: 12344,
    title: 'asddsad',
    content: 'asdffdsaf',
    publisher: '연합뉴스',
    thumbnail: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1622186006/noticon/qwvot1hwgwh0shnzumww.png',
    createAt: '2021-05-30T04:43:26.964Z',
  }
];

const NewsPage: React.FC = () => {
  return (
    <Page>
      <Header >뉴스룸</Header>
      <News.List
        news={news}
      />
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