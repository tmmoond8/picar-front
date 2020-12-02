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
  const {
    author,
    title,
    content,
    commentCount: _commentCount,
    emotionCount: _emotionCount,
  } = article;
  const [commentCount, setCommentCount] = React.useState(_commentCount);
  const [emotionCount, setEmotionCount] = React.useState(_emotionCount);

  return (
    <React.Fragment>
      {article && (
        <Self>
          <ArticleHead
            thumbnail={author.thumbnail}
            authorId={author.id}
            name={author.name}
            group={author.group}
            createdDate={article.createAt}
          />
          <ArticleBody
            title={title}
            content={content}
            photos={article.photos}
          />
          <ArticleFooter
            viewCount={1004}
            commentCount={commentCount}
            emotionCount={emotionCount}
            emotions={{ LOVE: 123 }}
          />
          <HR />
          {article.id && (
            <CommentArea
              articleId={article.id}
              setCommentCount={setCommentCount}
            />
          )}
        </Self>
      )}
    </React.Fragment>
  );
}

const Self = styled.div``;
const HR = styled.hr`
  margin: 0;
  border: 0;
  height: 12px;
  box-shadow: inset 0 0.5px 0 0 ${colors.blackD9},
    inset 0 -0.5px 0 0 ${colors.blackD9};
  background-color: ${colors.blackF5F6F7};
`;
