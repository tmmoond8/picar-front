import Emotion from '../components/Emotion';

export const EMOTION_TYPE = {
  LOVE: 'LOVE',
  SAD: 'SAD',
  LAUGHING: 'LAUGHING',
  ANGRY: 'ANGRY',
} as const;

export type EmotionType = keyof typeof EMOTION_TYPE;

export const EMOTION_ICON = {
  LOVE: 'emojiLove',
  SAD: 'emojiSad',
  LAUGHING: 'emojiLaughing',
  ANGRY: 'emojiAngry',
};

export type EmotionIcon = typeof EMOTION_ICON[keyof typeof EMOTION_ICON];

export interface EmotionCount {
  type: EmotionType;
  icon: EmotionIcon;
  count: number;
}

export default interface Emotion {
  id: string;
  articleId: number;
  type: EmotionType;
  userCode: string;
}

export enum UpdateStatus {
  created = 'created',
  updated = 'updated',
  removed = 'removed',
}

export type UpdateStatusKey = keyof typeof UpdateStatus;
