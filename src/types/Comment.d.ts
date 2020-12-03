export default interface Comment {
  about?: string;
  id: string;
  content: string;
  replies?: Comment[];
  author: Profile;
  createAt: string;
  updateAt: string;
}