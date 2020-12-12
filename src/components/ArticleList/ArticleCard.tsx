/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Article from '../../types/Article';

import { Profile as UserProfile } from '../../types/User';

import { useStore, observer } from '../../stores';

import ArticleCardHead from './ArticleCardHead';
import ArticleCardBody from './ArticleCardBody';
import ArticleCardBottom from './ArticleCardBottom';
import { colors } from '../../styles';

type ArticleCardProps = Article & { bookmark: boolean };

export default observer(function ArticleCard(
  props: ArticleCardProps,
): JSX.Element {
  const {
    title,
    content,
    author,
    createAt,
    id,
    photos,
    commentCount,
    emotionCount,
    bookmark,
  } = props;
  const { thumbnail, name, group } = author as UserProfile;
  const history = useHistory();
  const { article, user } = useStore();

  const handleClickBookmark = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    if (bookmark) {
      user.removeBookmark(id);
    } else {
      user.addBookmark(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, bookmark, id]);

  const handleClickArticle = React.useCallback(() => {
    history.push(`/article/${id}`);
  }, [history, id]);

  return (
    <Card>
      <ArticleCardHead
        thumbnail={thumbnail}
        name={name}
        group={group || ''}
        createAt={createAt}
      />
      <ArticleCardBody
        handleClickArticle={handleClickArticle}
        title={title}
        content={content}
        photos={photos}
      />
      <ArticleCardBottom
        articleId={id}
        emotionCount={emotionCount}
        commentCount={commentCount}
        bookmark={bookmark}
        handleClickBookmark={handleClickBookmark}
        hasEmotion={id in user.emotions}
      />
    </Card>
  );
});

const Card = styled.li`
  padding: 16px 18px;
  background-color: ${colors.white};
`;
