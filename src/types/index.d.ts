import { Page } from '../store/ui';
export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

export type PagePaths = typeof Page[keyof typeof Page];
