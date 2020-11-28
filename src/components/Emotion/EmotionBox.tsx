/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { observer } from './context';
import Icon, { IconKey } from '../Icon';

const emotions = [
  { type: 'love', icon: 'emojiLove', count: 12 },
  { type: 'sad', icon: 'emojiSad', count: 12 },
  { type: 'laughing', icon: 'emojiLaughing', count: 12 },
  { type: 'angry', icon: 'emojiAngry', count: 12 },
];

const EmotionBox: React.FC<{ articleId: number }> = ({ articleId }) => {
  return (
    <StyledEmotionBox>
      {emotions.map((emotion) => (
        <Emotion>
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
  padding: 24px 18px;
`;

const Emotion = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  max-width: 77px;
  width: 100%;
  border-radius: 8px;

  p {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 500;
    font-family: Roboto, 'Roboto', sans-serif;
  }
`;
