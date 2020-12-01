export const EMOTION_TYPE = {
  LOVE: 'LOVE',
  SAD: 'SAD',
  LAUGHING: 'LAUGHING',
  ANGRY: 'ANGRY'
} as const;

export const EMOTION_ICON = {
  LOVE: 'emojiLove',
  SAD: 'emojiSad',
  LAUGHING: 'emojiLaughing',
  ANGRY: 'emojiAngry',
}

export interface Emotion {
  type: keyof typeof EMOTION_TYPE;
  icon: typeof EMOTION_ICON[keyof typeof EMOTION_ICON];
  count: number;
}