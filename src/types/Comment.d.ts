export default interface Comment {
  about?: string;
  id: string;
  content: string;
  replies?: Comment[];
  author: Profile;
  isDelete: boolean;
  createAt: string;
  updateAt: string;
}