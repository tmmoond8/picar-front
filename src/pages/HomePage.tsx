/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import Page from './BasePage';
import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';
import { CAROUSEL } from '../types/constants';

export default observer(function HomePage(): JSX.Element {
  const { article, ui, user } = useStore();
  ui.setHeaderNavigation();

  const handleChangeIndex = React.useCallback(
    (index: number) => {
      article.groupIndex = index;
    },
    [article],
  );

  return (
    <Page>
      <Wrapper>
        <Carousel
          id={CAROUSEL.HOME}
          index={article.groupIndex}
          onChangeIndex={handleChangeIndex}
        >
          <ArticleList
            articles={article.loungeArticles}
            bookmarks={user.bookmarks}
          />
          <ArticleList
            articles={article.freeArticles}
            bookmarks={user.bookmarks}
          />
          <ArticleList
            articles={article.humorArticles}
            bookmarks={user.bookmarks}
          />
          <ArticleList
            articles={article.govermentSupportArticles}
            bookmarks={user.bookmarks}
          />
        </Carousel>
        <MenuBar />
      </Wrapper>
    </Page>
  );
});

const Wrapper = styled.main`
  height: 100%;
  padding-bottom: 56px;
`;
