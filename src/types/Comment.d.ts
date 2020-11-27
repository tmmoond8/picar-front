export default interface Comment {
  id: string;
  content: string;
  replies: Reply[];
  author: Profile;
  createAt: string;
  updateAt: string;
}

export interface Reply extends Omit<Comment, 'replies'> {
  about: string;
}