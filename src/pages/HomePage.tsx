/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';
import { CAROUSEL } from '../types/constants';

export default observer(function HomePage(): JSX.Element {
  const { article, ui, user } = useStore();
  ui.setHeaderNavigation();
  const { articles, groupIndex } = article;

  const loungeArticles = React.useMemo(() => {
    return articles.filter(
      (_article) => _article.group === article.selectedLounge,
    );
  }, [article.selectedLounge, articles]);

  const freeArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === '자유');
  }, [articles]);

  const humorArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === '유머');
  }, [articles]);

  const govermentSupportArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === '정부지원');
  }, [articles]);

  const handleChangeIndex = React.useCallback(
    (index: number) => {
      article.groupIndex = index;
    },
    [article],
  );

  return (
    <Wrapper>
      <Carousel
        id={CAROUSEL.HOME}
        index={groupIndex}
        onChangeIndex={handleChangeIndex}
      >
        <ArticleList articles={loungeArticles} bookmarks={user.bookmarks} />
        <ArticleList articles={freeArticles} bookmarks={user.bookmarks} />
        <ArticleList articles={humorArticles} bookmarks={user.bookmarks} />
        <ArticleList
          articles={govermentSupportArticles}
          bookmarks={user.bookmarks}
        />
      </Carousel>
      <MenuBar />
    </Wrapper>
  );
});

const Wrapper = styled.main`
  height: 100%;
  padding-bottom: 56px;
`;
