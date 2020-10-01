/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';

export default observer(function HomePage(): JSX.Element {
  const { article } = useStore();
  const { articles, groupIndex } = article;

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
    <Carousel index={groupIndex} onChangeIndex={handleChangeIndex}>
      <ArticleList articles={articles} />
      <ArticleList articles={freeArticles} />
      <ArticleList articles={humorArticles} />
      <ArticleList articles={govermentSupportArticles} />
    </Carousel>
  );
});
