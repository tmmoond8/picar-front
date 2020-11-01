import { IconKey } from '../components/Icon';
export const ROUNGE = '라운지';

export const NAVIGATIONS = [
  {
    name: ROUNGE,
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

export const ROUNGES: Rounge[] = [
  { name: '요식업', icon: 'roungeFood'},
  { name: '카페', icon: 'roungeCafe'},
  { name: '주점', icon: 'roungeAlchol'},
  { name: '편의점', icon: 'roungeRetail'},
  { name: '쇼핑몰', icon: 'roungeShop'},
  { name: '숙박업', icon: 'roungeMotel'},
  { name: '스타트업', icon: 'roungeStartup'},
  { name: '펫샵', icon: 'roungePet'},
  { name: '기타라운지', icon: 'roungeAll'},
];

export const CAROUSEL = {
  HOME: 'homeFlickingMoveTo',
  SIGNUP: 'signupFlickingMoveTo',
} as const;