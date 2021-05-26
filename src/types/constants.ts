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
  ARTICLE_ALBUM: 'articleAlbumFlickingMoveTo',
} as const;

interface Model {
  name: string;
  displayName: string;
}
interface Vendor {
  name: string;
  displayName: string;
  icon?: string;
  children?: Model[];
}

export const VENDOR: Vendor[] = [
  {
    name: 'TESLA', displayName: '테슬라', icon: '', children: [
      {
        name: 'TESLA-MODEL-Y',
        displayName: '테슬라 모델 Y',
      },
      {
        name: 'TESLA-MODEL-3',
        displayName: '테슬라 모델 3',
      },
      {
        name: 'TESLA-MODEL-X',
        displayName: '테슬라 모델 X',
      },
    ],
  }, {
    name: 'HYUNDAI', displayName: '현대', icon: '', children: [
      {
        name: 'HYUNDAI-IONIC-5',
        displayName: '현대 아이오닉 5',
      },
      {
        name: 'HYUNDAI-IONIC-4',
        displayName: '현대 아이오닉 4',
      },
      {
        name: 'HYUNDAI-IONIC-3',
        displayName: '현대 아이오닉 3',
      },
    ],
  }, {
    name: 'KIA', displayName: '기아', icon: '', children: [
      {
        name: 'HYUNDAI-NIRO',
        displayName: '기아 니로',
      },
      {
        name: 'HYUNDAI-NIRO-EV',
        displayName: '기아 니로 EV',
      },
    ],
  },
]