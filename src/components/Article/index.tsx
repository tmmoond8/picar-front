/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';

import IArticle from '../../types/Article';
import Emotion from '../../types/Emotion';
import { colors } from '../../styles';
import ArticleContext from './context';

interface ArticleProps {
  article: IArticle;
  emotions: Emotion[];
  setEmotions: (emotions: Emotion[]) => void;
  commentCount: number;
}

export default function Article(props: ArticleProps): JSX.Element {
  const { article, emotions, setEmotions, commentCount } = props;

  return (
    <ArticleContext.Provider
      value={{
        article,
        emotions,
        setEmotions,
        commentCount,
        viewCount: 1244,
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
