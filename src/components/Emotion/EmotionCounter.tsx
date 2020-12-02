/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import BottomSheet from '../BottomSheet';
import { colors } from '../../styles';
import Icon from '../Icon';
import { useFetch } from './hooks';
import EmotionBox from './EmotionBox';
import Button from '../Button';
import { UpdateStatus, UpdateStatusKey } from '../../types/Emotion';

const EmotionCounter: React.FC<{ articleId: number }> = ({ articleId }) => {
  const bottomSheet = BottomSheet.useBottomSheet();
  const { emotions, yourEmotion, setEmotions, setYourEmotion } = useFetch(
    articleId,
  );
  const [status, setStatus] = React.useState<UpdateStatusKey>(
    UpdateStatus.updated,
  );
  const emotionCount = React.useMemo(() => {
    return emotions.reduce((accum, emotion) => {
      return accum + emotion.count;
    }, 0);
  }, [emotions]);

  const handleClickEmotion = React.useCallback(() => {
    bottomSheet.open({
      title: `공감 ${emotionCount}`,
      contents: (
        <EmotionBox
          articleId={articleId}
          emotions={emotions}
          yourEmotion={yourEmotion}
          handleClickEmotion={({ updateStatus, emotionCount, yourEmotion }) => {
            bottomSheet.close();
            setStatus(updateStatus);
            setYourEmotion(yourEmotion);
            setEmotions(
              emotions.map((emotion) => ({
                ...emotion,
                count: emotionCount[emotion.type],
              })),
            );
          }}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, bottomSheet, emotionCount, emotions, yourEmotion]);

  return (
    <Button
      icon={
        <Icon
          icon="emojiSmile"
          size="18px"
          color={yourEmotion ? colors.primary : undefined}
        />
      }
      onClick={handleClickEmotion}
    >
      {emotionCount}
    </Button>
  );
};

export default React.memo(EmotionCounter);
