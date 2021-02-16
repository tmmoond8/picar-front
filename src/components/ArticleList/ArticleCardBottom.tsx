/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import Emotion from '../Emotion';
import CommentCounter from '../Comment/CommentCounter';
import { EmotionType } from '../../types/Emotion';
import { colors } from '../../styles';

interface ArticleCardBottomProps {
  articleId: number;
  articleAuthorCode: string;
  emotionCount: number;
  commentCount: number;
  myEmotion?: EmotionType;
  hasBookmark: boolean;
  hasComment: boolean;
  handleClickBookmark: () => void;
  handleEmotionUpdate: (emotionType: EmotionType) => void;
}

const ArticleCardHead: React.FC<ArticleCardBottomProps> = ({
  articleId,
  articleAuthorCode,
  emotionCount,
  commentCount,
  myEmotion,
  hasBookmark,
  hasComment,
  handleClickBookmark,
  handleEmotionUpdate,
}) => {
  return (
    <Bottom>
      <Emotion.Counter
        articleId={articleId}
        emotionCount={emotionCount}
        myEmotion={myEmotion}
        handleEmotionUpdate={handleEmotionUpdate}
      />
      <CommentCounter
        articleId={articleId}
        articleAuthorCode={articleAuthorCode}
        commentCount={commentCount}
        hasComment={hasComment}
      />
      <div className="right">
        <BookmarkButton
          marked={hasBookmark}
          onClick={handleClickBookmark}
          icon={<Icon icon="bookmark" size="18px" />}
        />
      </div>
    </Bottom>
  );
};

export default React.memo(ArticleCardHead);

const Bottom = styled.div`
  display: flex;
  height: auto;

  & > button {
    cursor: auto;
    border: none;
  }
  * + * {
    margin-left: 8px;
  }
  margin-top: 4px;
  .right {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }
`;

const BookmarkButton = styled(Button)<{ marked: boolean }>`
  width: 41px;
  height: 28px;
  transition: background-color 0.3s ease-in-out;
  svg {
    margin: 0 auto;
    cursor: pointer;
  }
  ${(p) =>
    p.marked &&
    css`
      background-color: ${colors.primaryE};
      border: none;
      svg {
        color: ${colors.primary};
      }
    `}
`;
