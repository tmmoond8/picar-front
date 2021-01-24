/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useModal } from '../Modal';
import { colors } from '../../styles';
import Icon from '../Icon';

import EmotionBox from './EmotionBox';
import { EmotionType } from '../../types/Emotion';
import Button from '../Button';

const EmotionCounter: React.FC<{
  articleId: number;
  emotionCount: number;
  myEmotion?: EmotionType;
  handleEmotionUpdate: (emotionType: EmotionType) => void;
}> = ({
  articleId,
  emotionCount: _emotionCount,
  myEmotion,
  handleEmotionUpdate,
}) => {
  const [emotionCount, setEmotionCount] = React.useState(_emotionCount);
  const modal = useModal();

  const handleClickEmotion = () => {
    modal.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <EmotionBox
          articleId={articleId}
          myEmotion={myEmotion}
          handleClose={modal.close}
          setEmotionCount={setEmotionCount}
          handleEmotionUpdate={handleEmotionUpdate}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const color = React.useMemo(() => (myEmotion ? colors.primary : undefined), [
    myEmotion,
  ]);
  return (
    <EmotionCounterButton
      icon={<Icon icon="emojiSmile" size="18px" color={color} />}
      onClick={handleClickEmotion}
    >
      <Counter className="Counter" color={color}>
        {emotionCount}
      </Counter>
    </EmotionCounterButton>
  );
};

export default EmotionCounter;

const EmotionCounterButton = styled(Button)`
  && {
    border-radius: 4px;
    border: solid 1px #ebebeb;
    cursor: pointer;
    svg {
      cursor: pointer;
    }
  }
`;

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;
