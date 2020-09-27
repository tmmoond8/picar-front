/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { article, observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';
import Carousel from '../components/Carousel';

export default observer(function HomePage(): JSX.Element {
  const {
    article: { articles, groupIndex },
  } = useStore();

  const freeArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === 'free');
  }, [articles]);

  const humorArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === 'humor');
  }, [articles]);

  const govermentSupportArticles = React.useMemo(() => {
    return articles.filter((article) => article.group === 'govermentSupport');
  }, [articles]);

  const handleChangeIndex = React.useCallback((index: number) => {
    article.groupIndex = index;
  }, []);

  return (
    <Carousel index={groupIndex} onChangeIndex={handleChangeIndex}>
      <ArticleList articles={articles} />
      <ArticleList articles={freeArticles} />
      <ArticleList articles={humorArticles} />
      <ArticleList articles={govermentSupportArticles} />
    </Carousel>
  );
});
