import { IconKey } from '../components/Icon';
export const LOUNGE = '라운지';
export const LOUNGE_NAMES = {
  ALL: '전체',
  FREE: '자유',
  CHARGMENT: '충전',
  SHOW_OFF: '뽐뿌',
} as const;

export const NAVIGATIONS = [LOUNGE, ...Object.values(LOUNGE_NAMES)];
export interface Lounge {
  name: string;
  icon: IconKey;
}

export const LOUNGES: Lounge[] = [
  { name: '요식업', icon: 'loungeFood' },
  { name: '카페', icon: 'loungeCafe' },
  { name: '주점', icon: 'loungeAlchol' },
  { name: '편의점', icon: 'loungeRetail' },
  { name: '쇼핑몰', icon: 'loungeShop' },
  { name: '숙박업', icon: 'loungeMotel' },
  { name: '스타트업', icon: 'loungeStartup' },
  { name: '펫샵', icon: 'loungePet' },
  { name: '기타 라운지', icon: 'loungeAll' },
];

export const CAROUSEL = {
  HOME: 'homeFlickingMoveTo',
  SIGNUP: 'signupFlickingMoveTo',
  SEARCH: 'searchFlickingMoveTo',
  PROFILE: 'profileFlickingMoveTo',
  EDITOR: 'editorFlickingMoveTo',
  LOUNGE_SELECTOR: 'loungeSelectorFlickingMoveTo',
} as const;

interface Model {
  name: string;
}
interface Vendor {
  name: string;
  icon?: string;
  children: Model[];
}

export const VENDOR: Vendor[] = [
  {
    name: '테슬라', icon: '', children: [
      {
        name: '테슬라 모델3',
      },
      {
        name: '테슬라 모델Y',
      },
      {
        name: '테슬라 모델X',
      },
      {
        name: '테슬라 모델S',
      },
    ],
  }, {
    name: '현대', icon: '', children: [
      {
        name: '아이오닉5',
      },
      {
        name: '더뉴아이오닉 EV',
      },
      {
        name: '아이오닉 EV',
      },
      {
        name: '코나 EV',
      },
      {
        name: '포터 EV',
      },
    ],
  }, {
    name: '기아', icon: '', children: [
      {
        name: 'EV6',
      },
      {
        name: '쏘울 EV',
      },
      {
        name: '봉고 EV',
      },
    ],
  },
];

export const Models = VENDOR.map(({ children }) => children).flat() ?? [];