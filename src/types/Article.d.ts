import { Profile } from './Article';

export default interface Article {
  id?: number;
  title: string;
  content: string;
  group: string;
  author: Profile;
  emotionCount: number;
  commentCount: number;
  photos: string | null;
  createAt: string;
  updateAt: string;
}
