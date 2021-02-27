export interface Profile {
  code: string;
  name: string;
  profileImage: string;
  email: string;
  description: string | null;
  group?: string;
  isOwner?: boolean;
}

export default interface User extends Profile {
  provider: 'kakao' | 'naver';
  snsId: string;
}

export interface SignUpUser {
  provider: 'kakao' | 'naver';
  snsId: string;
  name?: string;
  thumbnail: string;
  profileImage: string;
  email?: string;
  group?: string;
  isOwner?: boolean;
  accessToken: string;
  regreshToken: string;
  uuid: string;
}