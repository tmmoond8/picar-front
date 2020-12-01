/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import { observer } from './context';
import Icon, { IconKey } from '../Icon';
import { useFectch, useCUD } from './hooks';

const EmotionBox: React.FC<{ articleId: number; handleClose: () => void }> = ({
  articleId,
  handleClose,
}) => {
  const { emotions, yourEmotion } = useFectch(articleId);
  const handleCUD = useCUD(articleId, handleClose);
  console.log(yourEmotion);

  return (
    <StyledEmotionBox>
      {emotions.map((emotion) => (
        <Emotion
          key={emotion.type}
          selected={yourEmotion === emotion.type}
          onClick={() => handleCUD(emotion.type)}
        >
          <Icon icon={emotion.icon as IconKey} size="48px" />
          <p>{emotion.count}</p>
        </Emotion>
      ))}
    </StyledEmotionBox>
  );
};

export default observer(EmotionBox);

const StyledEmotionBox = styled.ol`
  display: flex;
  justify-content: space-between;
  max-width: 370px;
  margin: 0 auto;
  padding: 24px 18px;
`;

const Emotion = styled.li<{ selected: boolean }>`
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
