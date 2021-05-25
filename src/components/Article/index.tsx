/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import ArticleHead from './ArticleHead';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';
import ArticleEmpty from './ArticleEmpty';
import PicarHelmet from '../PicarHelmet';

import IArticle from '../../types/Article';
import { colors } from '../../styles';
import { useOG } from '../../hooks'
import ArticleContext from './context';

import { useFetch as useFetchEmotion } from '../Emotion/hooks';
export { useOpenArticleEditor, useMoreMenu, useFetch } from './hooks';

const Article: React.FC<{
  article: IArticle;
  commentCount: number;
}> = ({ article, commentCount }) => {
  const { emotionCounts, setEmotionCounts } = useFetchEmotion(article.id);
  useOG(article);
  return (
    <ArticleContext.Provider
      value={{
        article,
        commentCount,
        emotionCounts,
      }}
    >
      {article && (
        <React.Fragment>
          <PicarHelmet.Article
            title={article.title}
            description={article.content}
            image={article.photos}
          />
          <ArticleHeader />
          {article.isDelete && <ArticleEmpty />}
          {!article.isDelete && (
            <React.Fragment >
              <ArticleHead />
              <ArticleBody />
              <ArticleFooter />
              <HR />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </ArticleContext.Provider>
  );
};

export default Article;

const HR = styled.hr`
  margin: 0;
  border: 0;
  height: 12px;
  background-color: ${colors.blackF5F6F7};
`;
