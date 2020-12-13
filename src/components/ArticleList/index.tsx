/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Article from '../../types/Article';
import { EmotionType } from '../../types/Emotion';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';

interface ArticleListProps {
  articles: Article[];
  bookmarks: Set<number>;
}

export default observer(function ArticleList(
  props: ArticleListProps,
): JSX.Element {
  const { articles, bookmarks } = props;
  const { user } = useStore();

  const handleClickBookmark = React.useCallback(
    (articleId: number) => {
      if (user.needLogin()) {
        return;
      }
      if (bookmarks.has(articleId)) {
        user.removeBookmark(articleId);
      } else {
        user.addBookmark(articleId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [bookmarks, user],
  );
  const handleEmotionUpdate = (articleId: number) => (
    emotionType: EmotionType | null,
  ) => {
    user.setEmotion(articleId, emotionType);
  };

  return (
    <StyledArticleList>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          handleClickBookmark={() => handleClickBookmark(article.id)}
          handleEmotionUpdate={() => handleEmotionUpdate(article.id)}
          hasBookmark={bookmarks.has(article.id)}
          hasComment={false}
          hasEmotion={article.id in user.emotions}
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
