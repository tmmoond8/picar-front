/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Icon, { IconKey } from '../Icon';
import { useCUD } from './hooks';
import { Emotion, EmotionType, UpdateStatus } from '../../types/Emotion';

interface EmotionBoxProp {
  articleId: number;
  emotions: Emotion[];
  yourEmotion: EmotionType | null;
  handleClickEmotion: (result: {
    updateStatus: UpdateStatus;
    emotionCount: Record<EmotionType, number>;
    yourEmotion: EmotionType;
  }) => void;
}

const EmotionBox: React.FC<EmotionBoxProp> = ({
  articleId,
  emotions,
  yourEmotion,
  handleClickEmotion,
}) => {
  const handleCUD = useCUD(articleId, handleClickEmotion);

  return (
    <StyledEmotionBox>
      {emotions.map((emotion) => (
        <EmotionItem
          key={emotion.type}
          selected={yourEmotion === emotion.type}
          onClick={() => handleCUD(emotion.type)}
        >
          <Icon icon={emotion.icon as IconKey} size="48px" />
          <p>{emotion.count}</p>
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
