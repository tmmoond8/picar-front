import React from 'react';
import API from '../../apis';
import { Emotion, EMOTION_TYPE, EMOTION_ICON, EmotionType, UpdateStatus } from '../../types/Emotion';


const defaultEmotions: Emotion[] = [
  {
    type: EMOTION_TYPE.LOVE,
    icon: EMOTION_ICON.LOVE,
    count: 0,
  },
  {
    type: EMOTION_TYPE.SAD,
    icon: EMOTION_ICON.SAD,
    count: 0,
  },
  {
    type: EMOTION_TYPE.LAUGHING,
    icon: EMOTION_ICON.LAUGHING,
    count: 0,
  },
  {
    type: EMOTION_TYPE.ANGRY,
    icon: EMOTION_ICON.ANGRY,
    count: 0,
  },
];


export const useFetch = (articleId: number) => {
  const [emotions, setEmotions] = React.useState<Emotion[]>(defaultEmotions);
  const [_yourEmotion, setYourEmotion] = React.useState<EmotionType | null>(null);
  React.useEffect(() => {
    (async () => {
      const { data: { emotionCount, yourEmotion, ok } } = await API.emotion.list(articleId);
      if (ok) {
        setEmotions(emotions.map(emotion => ({
          ...emotion,
          count: emotionCount[emotion.type]
        })));
        setYourEmotion(yourEmotion as EmotionType);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId])

  return {
    emotions,
    setEmotions,
    yourEmotion: _yourEmotion,
    setYourEmotion,
  };
}

export const useCUD = (articleId: number, callback: (result: {
  updateStatus: UpdateStatus;
  emotionCount: Record<EmotionType, number>;
  yourEmotion: EmotionType;
}) => void) => {
  const handleCUD = React.useCallback(async (type: EmotionType) => {
    try {
      const { data: {
        ok,
        updateStatus,
        emotionCount,
        yourEmotion,
      }} = await API.emotion.cud({
        articleId,
        type,
      });
      if (ok) {
        callback({
          updateStatus,
          emotionCount,
          yourEmotion,
        });
      } else {
        callback({
          updateStatus: UpdateStatus.updated,
          emotionCount,
          yourEmotion,
        });
      }
    } catch(error) {
      console.error(error);
    }
  },[articleId, callback]);
  return handleCUD;
}