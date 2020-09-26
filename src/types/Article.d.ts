import { Profile } from './Article';

export default interface Article {
  id?: number;
  title: string;
  content: string;
  group: string;
  author: Profile;
  createAt: Date;
  updateAt: Date;
}
