/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Icon, { IconKey } from '../Icon';
import { useCUD } from './hooks';
import { EmotionType } from '../../types/Emotion';
import { useFetch } from './hooks';

interface EmotionBoxProp {
  articleId: number;
  myEmotion?: EmotionType;
  handleClose: () => void;
  setEmotionCount: (count: number) => void;
  needLogin: () => boolean;
  handleEmotionUpdate: (emotionType: EmotionType) => void;
}

interface EmotionResponse {
  emotionCount: Record<EmotionType, number>;
}

const EmotionBox: React.FC<EmotionBoxProp> = ({
  articleId,
  myEmotion,
  handleClose,
  setEmotionCount,
  needLogin,
  handleEmotionUpdate,
}) => {
  const { emotionCounts } = useFetch(articleId);
  const callbackEmotion = (result: EmotionResponse) => {
    const { emotionCount } = result;
    handleClose();
    setEmotionCount(
      Object.values(emotionCount).reduce((accum, count) => accum + count, 0),
    );
  };

  const handleCUD = useCUD(articleId, callbackEmotion);
  const handleClickEmotion = React.useCallback(
    (emotionType: EmotionType) => {
      if (needLogin()) {
        handleClose();
        return;
      }
      handleEmotionUpdate(emotionType);
      handleCUD(emotionType);
    },
    [needLogin, handleEmotionUpdate, handleCUD, handleClose],
  );
  return (
    <StyledEmotionBox>
      {emotionCounts.map((emotionCount) => (
        <EmotionItem
          key={emotionCount.type}
          selected={myEmotion === emotionCount.type}
          onClick={() => handleClickEmotion(emotionCount.type)}
        >
          <Icon icon={emotionCount.icon as IconKey} size="48px" />
          <p>{emotionCount.count}</p>
        </EmotionItem>
      ))}
    </StyledEmotionBox>
  );
};

export default EmotionBox;

const StyledEmotionBox = styled.ol`
  display: flex;
  justify-content: space-between;
  max-width: 370px;
  margin: 0 auto;
  padding: 24px 18px;
`;

const EmotionItem = styled.li<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  max-width: 77px;
  width: 100%;
  border-radius: 8px;
  &:active {
    background-color: ${colors.blackF5F6F7};
  }
  user-select: none;
  cursor: pointer;

  svg {
    cursor: pointer;
  }

  ${(p) =>
    p.selected
      ? css`
          background-color: ${colors.primaryE};
          color: ${colors.primary2};
        `
      : ''};

  p {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 500;
    font-family: Roboto, 'Roboto', sans-serif;
  }
`;
