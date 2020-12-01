import React from 'react';
import API from '../../apis';
import { Emotion, EMOTION_TYPE, EMOTION_ICON } from '../../types/Emotion';


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


export const useFectch = (articleId: number) => {
  const [emotions, setEmotions] = React.useState<Emotion[]>(defaultEmotions);
  const [_yourEmotion, setYourEmotion] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const { data: { emotionCount, yourEmotion, ok } } = await API.emotion.list(articleId);
      if (ok) {
        setEmotions(emotions.map(emotion => ({
          ...emotion,
          count: emotionCount[emotion.type]
        })));
        setYourEmotion(yourEmotion);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId])

  return {
    emotions,
    yourEmotion: _yourEmotion,
  };
}

export const useCUD = (articleId: number, callback: () => void) => {
  const handleCUD = React.useCallback(async (type: keyof typeof EMOTION_TYPE) => {
    try {
      await API.emotion.cud({
        articleId,
        type,
      });
    } catch(error) {
      console.error(error);
    }
    callback();
  },[articleId, callback]);
  return handleCUD;
}