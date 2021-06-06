/* eslint-disable no-underscore-dangle */
import { ModalData } from '../components/Modal';
import { ContextMenuData, CustomContextMenuData } from '../components/ContextMenu';
import { AlertData } from '../components/Alert';

type OwnerGlobal = typeof globalThis & {
  __OWNER__: {
    openModal: (params: ModalData) => void;
    closeModal: (id: string) => void;
    openAlert: (params: AlertData) => void;
    closeAlert: (id: string) => void;
    openContextMenu: (params: ContextMenuData | CustomContextMenuData) => void;
    closeContextMenu: (id: string) => void;
    homeFlickingMoveTo: (i: number) => void;
    signupFlickingMoveTo: (i: number) => void;
    searchFlickingMoveTo: (i: number) => void;
    profileFlickingMoveTo: (i: number) => void;
    editorFlickingMoveTo: (i: number) => void;
    loungeSelectorFlickingMoveTo: (i: number) => void;
  };
};

const global = globalThis as OwnerGlobal;

if (global.__OWNER__ === undefined) {
  global.__OWNER__ = {
    openModal: () => console.log('not initialzed'),
    closeModal: () => console.log('not initialzed'),
    openAlert: () => console.log('not initialzed'),
    closeAlert: () => console.log('not initialzed'),
    openContextMenu: () => console.log('not initialzed'),
    closeContextMenu: () => console.log('not initialzed'),
    homeFlickingMoveTo: () => console.log('not initialzed'),
    signupFlickingMoveTo: () => console.log('not initialzed'),
    searchFlickingMoveTo: () => console.log('not initialzed'),
    profileFlickingMoveTo: () => console.log('not initialzed'),
    editorFlickingMoveTo: () => console.log('not initialzed'),
    loungeSelectorFlickingMoveTo: () => console.log('not initialzed'),
  };
}

export default global;
