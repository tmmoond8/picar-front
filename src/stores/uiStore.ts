import { action, observable } from 'mobx';
import { initalHeader, HeaderProps, headerType } from '../components/Header';
import { ContextMenuData } from '../components/ContextMenu';
import { BottomSheetData } from '../components/BottomSheet';

export interface UiStoreInterface {
  header: HeaderProps;
  keyboardMargin: number;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
  setHeaderBack: (options: Record<string, any>) => void;
  setHeaderClose: (options: Record<string, any>) => void;
  setKeyboardMargin: (height: number) => void;
  contextMenus: ContextMenuData[];
  bottomSheets: BottomSheetData[];
}

class UiStore implements UiStoreInterface {
  @observable header: HeaderProps;
  @observable keyboardMargin: number;
  @observable contextMenus: ContextMenuData[];
  @observable bottomSheets: BottomSheetData[];

  constructor() {
    this.header = initalHeader;
    this.keyboardMargin = 0;
    this.contextMenus = [];
    this.bottomSheets = [];
  }

  @action
  setHeaderNavigation() {
    this.header = {
      type: headerType.Navigation,
      height: 56,
    };
  }

  @action
  setHeaderNone() {
    this.header = {
      type: headerType.None,
      height: 0,
    };
  }

  @action
  setHeaderBack(options: Record<string, any>) {
    this.header = {
      type: headerType.Back,
      height: 56,
      options,
    };
  }

  @action
  setHeaderClose(options: Record<string, any>) {
    this.header = {
      type: headerType.Close,
      height: 56,
      options,
    };
  }

  /**
   * ios의 가상 키보드 높이에 대한 처리
   */
  @action
  setKeyboardMargin(height: number) {
    this.keyboardMargin = height;
  }
}

export default UiStore;
