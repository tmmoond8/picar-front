export default interface News {
  id: number;
  title: string;
  content: string;
  publisher: Profile;
  thumbnail?: string;
  createAt: string;
}