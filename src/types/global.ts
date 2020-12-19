/* eslint-disable no-underscore-dangle */
import { BottomSheetData } from '../components/BottomSheet';

type OwnerGlobal = typeof globalThis & {
  __OWNER__: {
    openBottomSheet: (params: BottomSheetData) => void;
    closeBottomSheet: (id: string) => void;
    homeFlickingMoveTo: (i: number) => void;
    signupFlickingMoveTo: (i: number) => void;
  };
};

const global = globalThis as OwnerGlobal;

if (global.__OWNER__ === undefined) {
  global.__OWNER__ = {
    closeBottomSheet: () => console.log('not initialzed'),
    openBottomSheet: () => console.log('not initialzed'),
    homeFlickingMoveTo: () => console.log('not initialzed'),
    signupFlickingMoveTo: () => console.log('not initialzed'),
  };
}

export default global;
