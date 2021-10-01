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
  };
  // const color = React.useMemo(() => (myEmotion ? colors.primary : undefined), [
  //   myEmotion,
  // ]);
  return (
    <EmotionCounterButton
      icon={<Icon icon="emojiSmile" size="18px" />}
      onClick={handleClickEmotion}
      hasMyEmotion={!!myEmotion}
    >
      <span className="Counter">{emotionCount}</span>
    </EmotionCounterButton>
  );
};

export default EmotionCounter;

const EmotionCounterButton = styled(Button)<{ hasMyEmotion: boolean }>`
  && {
    border-radius: 4px;
    border: solid 1px #ebebeb;
    transition: background-color 1s ease-out;
    cursor: pointer;
    .Icon.emojiSmile {
      cursor: pointer;
    }

    .Counter {
      margin-left: 0;
    }
    ${(p) =>
      p.hasMyEmotion &&
      css`
        color: ${colors.primary2};
        background-color: ${colors.primaryE};
        border: solid 1px ${colors.transparent};
        .Counter,
        .Icon.emojiSmile {
          color: ${colors.primary2};
        }
      `}
  }
`;
