/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleBody from './ArticleBody';
import IArticle from '../../types/Article';

interface ArticleProps {
  article: IArticle;
}

export default function Article(props: ArticleProps): JSX.Element {
  const { article } = props;
  const { author, title, content } = article;
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
          <ArticleBody title={title} content={content} />
        </Self>
      )}
    </React.Fragment>
  );
}

const Self = styled.div``;
