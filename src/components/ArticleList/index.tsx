/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Article from '../../types/Article';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList(props: ArticleListProps): JSX.Element {
  const { articles } = props;
  return (
    <Self>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </Self>
  );
}

const Self = styled.ol`
  background: ${colors.blackF5F6F7};
  li + li {
    margin-top: 8px;
  }
`;
