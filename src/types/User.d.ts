export interface Profile {
  id?: string;
  name: string;
  thumbnail?: string;
  coverImg?: string;
  email: string;
  description?: string;
}

export default interface User extends Profile {
  provider: string;
  snsId: string;
}
