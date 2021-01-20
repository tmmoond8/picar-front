/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';

import Article from '../../types/Article';
import { EmotionType } from '../../types/Emotion';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  bookmarks: Set<number>;
}

export default observer(function ArticleList(
  props: ArticleListProps,
): JSX.Element {
  const { articles, bookmarks, className } = props;
  const { user } = useStore();

  const handleClickBookmark = React.useCallback(
    (articleId: number) => () => {
      if (user.needLogin()) {
        return;
      }
      if (bookmarks.has(articleId)) {
        toast('북마크에서 제거했습니다.');
        user.removeBookmark(articleId);
      } else {
        toast('북마크에 추가했습니다.');
        user.addBookmark(articleId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [bookmarks, user],
  );
  const handleEmotionUpdate = (articleId: number) => (
    emotionType: EmotionType,
  ) => {
    user.setEmotion(articleId, emotionType);
  };

  return (
    <StyledArticleList className={cx("ArticleList", className)}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          handleClickBookmark={handleClickBookmark(article.id)}
          handleEmotionUpdate={handleEmotionUpdate(article.id)}
          hasBookmark={bookmarks.has(article.id)}
          hasComment={article.id in user.comments}
          myEmotion={user.emotions[article.id]}
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
  li {
    margin-top: 8px;
  }
`;
