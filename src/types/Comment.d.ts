import Article from '../types/Article';

export default interface Comment {
  about?: string;
  id: string;
  content: string;
  replies?: Comment[];
  articleId: number;
  author: Profile;
  isDelete: boolean;
  createAt: string;
  updateAt: string;
  article?: Article;
}