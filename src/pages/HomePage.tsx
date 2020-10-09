/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';
import MenuBar from '../components/MenuBar';

export default observer(function HomePage(): JSX.Element {
  const { article, ui } = useStore();
  ui.setHeaderNavigation();
  const { articles, groupIndex } = article;

  const roungeArticles = React.useMemo(() => {
    return articles.filter(
      (_article) => _article.group === article.selectedRounge,
    );
  }, [article.selectedRounge, articles]);

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
      <Carousel index={groupIndex} onChangeIndex={handleChangeIndex}>
        <ArticleList articles={roungeArticles} />
        <ArticleList articles={freeArticles} />
        <ArticleList articles={humorArticles} />
        <ArticleList articles={govermentSupportArticles} />
      </Carousel>
      <MenuBar />
    </Wrapper>
  );
});

const Wrapper = styled.main`
  height: 100%;
  padding-bottom: 56px;
`;
