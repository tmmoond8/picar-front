/** @jsx jsx */
import { jsx } from '@emotion/core';
import { observer, useStore } from '../stores';
import ArticleList from '../components/ArticleList';

export default observer(function HomePage(): JSX.Element {
  const {
    article: { articles },
  } = useStore();

  return <ArticleList articles={articles} />;
});
