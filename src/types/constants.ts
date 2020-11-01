import { IconKey } from '../components/Icon';
export const LOUNGE = '라운지';

export const NAVIGATIONS = [
  {
    name: LOUNGE,
  },
  {
    name: '자유',
  },
  {
    name: '유머',
  },
  {
    name: '정부지원',
  },
];

interface Rounge {
  name: string;
  icon: IconKey;
}

export const LOUNGES: Rounge[] = [
  { name: '요식업', icon: 'loungeFood'},
  { name: '카페', icon: 'loungeCafe'},
  { name: '주점', icon: 'loungeAlchol'},
  { name: '편의점', icon: 'loungeRetail'},
  { name: '쇼핑몰', icon: 'loungeShop'},
  { name: '숙박업', icon: 'loungeMotel'},
  { name: '스타트업', icon: 'loungeStartup'},
  { name: '펫샵', icon: 'loungePet'},
  { name: '기타라운지', icon: 'loungeAll'},
];

export const CAROUSEL = {
  HOME: 'homeFlickingMoveTo',
  SIGNUP: 'signupFlickingMoveTo',
} as const;