/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Article from '../../types/Article';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';

interface ArticleListProps {
  articles: Article[];
  bookmarks: Set<number>;
}

export default React.memo(function ArticleList(
  props: ArticleListProps,
): JSX.Element {
  const { articles, bookmarks } = props;

  return (
    <StyledArticleList>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          bookmark={!!article.id && bookmarks.has(article.id)}
        />
      ))}
    </StyledArticleList>
  );
});

const StyledArticleList = styled.ol`
  width: 100%;
  height: 100%;
  background: ${colors.blackF5F6F7};
  overflow-y: scroll;
  li + li {
    margin-top: 8px;
  }
`;
