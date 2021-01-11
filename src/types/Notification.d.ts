import { Profile } from './User';

export interface Notification {
  id: string;
  targetContent: string;
  target: string;
  emotion?: string;
  user: Profile;
  isViewd: boolean;
  createAt: string;
  articleId: string;
}