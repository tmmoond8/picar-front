/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';

import Icon from '../Icon';
import Article from '../../types/Article';
import { EmotionType } from '../../types/Emotion';
import ArticleCard from './ArticleCard';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import { useOpenArticleEditor } from '../Article';

const ArticleList: React.FC<{
  className?: string;
  articles: Article[];
  bookmarks: Set<number>;
  name?: string;
  emptyString?: string;
}> = ({
  articles, bookmarks, className, emptyString, name,
}) => {
    const { user } = useStore();
    const openArticleEditor = useOpenArticleEditor();

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

    const handleClickWrite = React.useCallback(() => {
      if (user.needLogin()) {
        return;
      }
      openArticleEditor();
    }, [openArticleEditor, user]);

    return (
      <StyledArticleList data-id={name} className={cx("ArticleList", className)}>
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
        {emptyString && articles.length === 0 && (
          <Empty >
            {emptyString.includes('첫 글을') && <Icon icon="cross" size="56px" onClick={handleClickWrite} />}
            {emptyString}
          </Empty>
        )}
      </StyledArticleList>
    );
  }

export default observer(ArticleList);

const StyledArticleList = styled.ol`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  li {
    margin-top: 8px;
  }
`;

const Empty = styled.li`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
    font-size: 17px;
    line-height: 1.18;
    color: ${colors.black99};

    .Icon.cross {
      margin-bottom: 24px;
    } 

    .Icon.cross {
      cursor: pointer;
    }
  }
`;