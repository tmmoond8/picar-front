import { Profile } from './User';

export interface Notification {
  targetContent: string;
  target: string;
  emotion?: string;
  user: Profile;
  isViewd: boolean;
  createAt: string;
}