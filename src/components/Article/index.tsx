/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';

import CommentArea from '../Comment';
import IArticle from '../../types/Article';
import { colors } from '../../styles';

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
          <ArticleFooter
            viewCount={1004}
            commentCount={12}
            sympathyCount={12}
            emojiHappy={4}
          />
          <HR />
          <CommentArea />
        </Self>
      )}
    </React.Fragment>
  );
}

const Self = styled.div``;
const HR = styled.hr`
  margin: 0;
  height: 12px;
  background-color: ${colors.blackF5F6F7};
`;
