import { action, observable } from 'mobx';
import { initalHeader, HeaderProps, headerType } from '../components/Header';
import { ContextMenuData } from '../components/ContextMenu';
import { ModalData } from '../components/Modal';
import { BreakPoints } from '../styles/mediaQuery';

type BreakPointKeys = keyof typeof BreakPoints;

export interface UiStoreInterface {
  header: HeaderProps;
  keyboardMargin: number;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
  setHeaderBack: (options: Record<string, any>) => void;
  setHeaderClose: (options: Record<string, any>) => void;
  setKeyboardMargin: (height: number) => void;
  contextMenus: ContextMenuData[];
  modals: ModalData[];
  queryMatch: Record<BreakPointKeys, boolean>;
}

class UiStore implements UiStoreInterface {
  @observable header: HeaderProps;
  @observable keyboardMargin: number;
  @observable contextMenus: ContextMenuData[];
  @observable modals: ModalData[];
  @observable queryMatch: Record<BreakPointKeys, boolean>;

  constructor() {
    this.header = initalHeader;
    this.keyboardMargin = 0;
    this.contextMenus = [];
    this.modals = [];
    this.queryMatch = {
      Mobile: false,
      Tablet: false,
      Desktop: false,
    }
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
