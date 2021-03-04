import { IconKey } from '../components/Icon';
export const LOUNGE = '라운지';
export const LOUNGE_NAMES = {
  FREE: '자유',
  HUMOR: '유머',
  GOVERMENT: '정부지원',
  FEEDBACK: '피드백',
} as const;

export const NAVIGATIONS = [LOUNGE, ...Object.values(LOUNGE_NAMES)];
export interface Lounge {
  name: string;
  icon: IconKey;
}

export const LOUNGES: Lounge[] = [
  { name: '요식업', icon: 'loungeFood'},
  { name: '카페', icon: 'loungeCafe'},
  { name: '주점', icon: 'loungeAlchol'},
  { name: '편의점', icon: 'loungeRetail'},
  { name: '쇼핑몰', icon: 'loungeShop'},
  { name: '숙박업', icon: 'loungeMotel'},
  { name: '스타트업', icon: 'loungeStartup'},
  { name: '펫샵', icon: 'loungePet'},
  { name: '기타 라운지', icon: 'loungeAll'},
];

export const CAROUSEL = {
  HOME: 'homeFlickingMoveTo',
  SIGNUP: 'signupFlickingMoveTo',
  SEARCH: 'searchFlickingMoveTo',
  PROFILE: 'profileFlickingMoveTo',
  EDITOR: 'editorFlickingMoveTo',
  ARTICLE_ALBUM: 'articleAlbumFlickingMoveTo',
} as const;