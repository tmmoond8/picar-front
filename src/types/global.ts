/* eslint-disable no-underscore-dangle */
import { BottomSheetData } from '../components/BottomSheet';
import { ContextMenuData } from '../components/ContextMenu';;

type OwnerGlobal = typeof globalThis & {
  __OWNER__: {
    openBottomSheet: (params: BottomSheetData) => void;
    closeBottomSheet: (id: string) => void;
    openContextMenu: (params: ContextMenuData) => void;
    closeContextMenu: () => void;
    homeFlickingMoveTo: (i: number) => void;
    signupFlickingMoveTo: (i: number) => void;
  };
};

const global = globalThis as OwnerGlobal;

if (global.__OWNER__ === undefined) {
  global.__OWNER__ = {
    openBottomSheet: () => console.log('not initialzed'),
    closeBottomSheet: () => console.log('not initialzed'),
    openContextMenu: () => console.log('not initialzed'),
    closeContextMenu: () => console.log('not initialzed'),
    homeFlickingMoveTo: () => console.log('not initialzed'),
    signupFlickingMoveTo: () => console.log('not initialzed'),
  };
}

export default global;
