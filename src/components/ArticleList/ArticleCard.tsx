/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Article from '../../types/Article';
import { useStore, observer } from '../../stores';
import { Profile as UserProfile } from '../../types/User';
import { EmotionType } from '../../types/Emotion';

import ArticleCardHead from './ArticleCardHead';
import ArticleCardBody from './ArticleCardBody';
import ArticleCardBottom from './ArticleCardBottom';
import { colors } from '../../styles';

type ArticleCardProps = Article & {
  hasBookmark: boolean;
  hasComment: boolean;
  myEmotion?: EmotionType;
  handleClickBookmark: () => void;
  handleEmotionUpdate: (emotionType: EmotionType) => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  content,
  author,
  createAt,
  id,
  thumbnail,
  commentCount,
  emotionCount,
  hasComment,
  hasBookmark,
  myEmotion,
  handleClickBookmark,
  handleEmotionUpdate,
}) => {
  const { profileImage, name, group, code } = author as UserProfile;
  const { util } = useStore();

  const handleClickArticle = React.useCallback(() => {
    util.history.push(`/article/${id}`);
  }, [util.history, id]);

  return (
    <Card className="ArticleCard">
      <ArticleCardHead
        profileImage={profileImage}
        name={name}
        group={group || ''}
        createAt={createAt}
        userCode={code}
      />
      <ArticleCardBody
        handleClickArticle={handleClickArticle}
        title={title}
        content={content}
        photos={thumbnail}
      />
      <ArticleCardBottom
        articleId={id}
        articleAuthorCode={code}
        emotionCount={emotionCount}
        commentCount={commentCount}
        handleClickBookmark={handleClickBookmark}
        handleEmotionUpdate={handleEmotionUpdate}
        hasBookmark={hasBookmark}
        myEmotion={myEmotion}
        hasComment={hasComment}
      />
    </Card>
  );
};

export default observer(ArticleCard);

const Card = styled.li`
  padding: 16px 18px;
  background-color: ${colors.white};
  overflow: hidden;
`;
