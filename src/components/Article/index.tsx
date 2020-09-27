/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import IArticle from '../../types/Article';

interface ArticleProps {
  article: IArticle | null;
}

export default function Article(props: ArticleProps): JSX.Element {
  const { article } = props;
  const { author } = article ?? {};
  return (
    <React.Fragment>
      {article && (
        <Self>
          <ArticleHead
            authorId={author.id}
            name={author.name}
            group={author.group}
            createdDate={article.createAt}
          />
        </Self>
      )}
    </React.Fragment>
  );
}

const Self = styled.div``;
