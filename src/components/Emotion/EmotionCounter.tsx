/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import BottomSheet from '../BottomSheet';
import { colors } from '../../styles';
import Icon from '../Icon';

import EmotionBox from './EmotionBox';
import Button from '../Button';
import { UpdateStatus, UpdateStatusKey } from '../../types/Emotion';

const EmotionCounter: React.FC<{ articleId: number; emotionCount: number }> = ({
  articleId,
  emotionCount: _emotionCount,
}) => {
  const bottomSheet = BottomSheet.useBottomSheet();

  const [emotionCount, setEmotionCount] = React.useState(_emotionCount);
  // const [status, setStatus] = React.useState<UpdateStatusKey>(
  //   UpdateStatus.updated,
  // );

  const handleClickEmotion = React.useCallback(() => {
    bottomSheet.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <p></p>
        // <EmotionBox
        //   articleId={articleId}
        //   handleClose={() => bottomSheet.close()}
        // />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, bottomSheet, emotionCount]);
  // const color = React.useMemo(
  //   () => (yourEmotion ? colors.primary : undefined),
  //   [yourEmotion],
  // );
  const color = undefined;
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

export default React.memo(EmotionCounter);

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
