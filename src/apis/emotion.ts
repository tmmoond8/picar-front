import { AxiosResponse } from 'axios';
import api from './config';
import Emotion, { UpdateStatus, EmotionType } from '../types/Emotion';

export const list = (
  userCode?: string,
): Promise<
  AxiosResponse<{
    ok: boolean;
    message: string;
    emotions: Emotion[];
  }>
> => api.get(`/emotion/user${userCode ? '/' + userCode : ''}`);

export const get = (
  articleId: number | string,
): Promise<
  AxiosResponse<{
    ok: boolean;
    message: string;
    emotionCount: { [key: string]: number };
    yourEmotion: string;
  }>
> => api.get(`/emotion/${articleId}`);

export const cud = (data: {
  type: string;
  articleId: number;
}): Promise<
  AxiosResponse<{
    ok: boolean;
    message: string;
    updateStatus: UpdateStatus;
    emotionCount: Record<EmotionType, number>;
    yourEmotion: EmotionType;
  }>
> => api.post('/emotion', data);

export const deleteEmotion = (
  articleId: number,
): Promise<
  AxiosResponse<{
    ok: boolean;
    message: string;
  }>
> => api.delete(`/emotion/delete/${articleId}`);
