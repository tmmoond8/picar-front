import { AxiosResponse } from 'axios';
import api from './config';
import { UpdateStatus, EmotionType } from '../types/Emotion';

export const list = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string; emotionCount: { [key: string]: number }; yourEmotion: string}>> => api.get(`/emotion/list/${articleId}`);
export const cud = (data: {
  type: string;
  articleId: number;
}): Promise<AxiosResponse<{ ok: boolean; message: string; updateStatus: UpdateStatus; emotionCount: any; yourEmotion: EmotionType }>> => api.post('/emotion', data);

export const deleteEmotion = (articleId: number): Promise<AxiosResponse<{ ok: boolean; message: string}>> => api.delete(`/emotion/delete/${articleId}`);