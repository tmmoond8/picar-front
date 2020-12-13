/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';

import IArticle from '../../types/Article';
import { colors } from '../../styles';
import ArticleContext from './context';

import { useFetch as useFetchEmotion } from '../Emotion/hooks';

interface ArticleProps {
  article: IArticle;
  commentCount: number;
}

export default function Article(props: ArticleProps): JSX.Element {
  const { article, commentCount } = props;
  const { emotionCounts, setEmotionCounts } = useFetchEmotion(article.id);

  return (
    <ArticleContext.Provider
      value={{
        article,
        commentCount,
        viewCount: 1244,
        emotionCounts,
      }}
    >
      {article && (
        <React.Fragment>
          <ArticleHead />
          <ArticleBody />
          <ArticleFooter />
          <HR />
        </React.Fragment>
      )}
    </ArticleContext.Provider>
  );
}

const HR = styled.hr`
  margin: 0;
  border: 0;
  height: 12px;
  box-shadow: inset 0 0.5px 0 0 ${colors.blackD9},
    inset 0 -0.5px 0 0 ${colors.blackD9};
  background-color: ${colors.blackF5F6F7};
`;
