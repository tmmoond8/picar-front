import { Profile } from './User';

export interface Notification {
  id: string;
  targetContent: string;
  type: string;
  emotion?: string;
  user: Profile;
  isViewd: boolean;
  createAt: string;
  articleId: string;
}