/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Icon from '../Icon';
import Content from '../Content';
import Emotion from '../Emotion';
import BottomSheet from '../BottomSheet';
import { useArticleContext, observer } from './context';

const ArticleFooter = () => {
  const {
    article,
    viewCount,
    commentCount,
    emotions,
    setEmotions,
    yourEmotion,
    setYourEmotion,
  } = useArticleContext();
  const bottomSheet = BottomSheet.useBottomSheet();

  const emotionCount = emotions.reduce((accum, { count }) => accum + count, 0);

  const handleClickEmotion = React.useCallback(() => {
    bottomSheet.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <Emotion.Box
          articleId={article!.id}
          emotions={emotions}
          yourEmotion={yourEmotion}
          handleClickEmotion={({ updateStatus, emotionCount, yourEmotion }) => {
            setYourEmotion(yourEmotion);
            setEmotions(
              emotions.map((emotion) => ({
                ...emotion,
                count: emotionCount[emotion.type],
              })),
            );
            bottomSheet.close();
          }}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, bottomSheet, emotionCount, emotions, yourEmotion]);

  const handleClickComment = React.useCallback(() => {
    // selector로 가져오는 것이 항상 나쁠까?
    const commentEditor = document.querySelector<HTMLDivElement>(
      '.CommentEditor',
    );
    if (commentEditor) {
      commentEditor.focus();
    }
  }, []);

  return (
    <React.Fragment>
      <InteractionCounter>
        <ul>
          <li>{`조회 ${viewCount}회`}</li>
          <li>{`댓글 ${commentCount}`}</li>
          <li>{`공감 ${emotionCount}`}</li>
        </ul>
        <Icon icon="emojiLove" size="18px" />
        <span>{12}</span>
      </InteractionCounter>
      <Content.HR size={1} color="" />
      <InteractionPanel>
        <li onClick={handleClickEmotion}>
          <Icon icon="emojiSmileOutline" size="20px" /> 공감표현
        </li>
        <li onClick={handleClickComment}>
          <Icon icon="chatOutline" size="20px" /> 댓글쓰기
        </li>
        <li>
          <Icon icon="share" size="20px" /> 공유하기
        </li>
      </InteractionPanel>
    </React.Fragment>
  );
};

export default observer(ArticleFooter);

const InteractionCounter = styled.div`
  display: flex;
  padding: 4px 18px 15px 18px;
  ul {
    display: flex;
    flex: 1;
    color: ${colors.black99};
    font-size: 13px;
  }
  li + li {
    position: relative;
    margin-left: 12px;
    &::before {
      content: '·';
      position: absolute;
      left: -10px;
      top: 0;
      font-weight: 600;
    }
  }
  span {
    font-size: 15px;
    color: ${colors.black66};
    margin-left: 5px;
  }
`;
const InteractionPanel = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 54px;
  width: 100%;
  max-width: 307px;
  margin: 0 auto;
  color: ${colors.black66};

  font-size: 14px;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      margin-right: 6px;
    }
  }
`;
