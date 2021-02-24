import { action, observable } from 'mobx';
import { initalHeader, HeaderProps, headerType } from '../components/Header';
import { ContextMenuData, CustomContextMenuData } from '../components/ContextMenu';
import { ModalData } from '../components/Modal';
import { AlertData } from '../components/Alert';
import { BreakPoints } from '../styles/mediaQuery';
import { CommonStore, observer, Stores } from '.';

type BreakPointKeys = keyof typeof BreakPoints;

export interface UiStoreInterface extends CommonStore{
  header: HeaderProps;
  keyboardMargin: number;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
  setHeaderBack: (options: Record<string, any>) => void;
  setHeaderClose: (options: Record<string, any>) => void;
  setKeyboardMargin: (height: number) => void;
  contextMenus: (ContextMenuData | CustomContextMenuData)[];
  modals: ModalData[];
  alerts: AlertData[];
  queryMatch: Record<BreakPointKeys, boolean>;
}

class UiStore implements UiStoreInterface {
  @observable header: HeaderProps;
  @observable keyboardMargin: number;
  @observable contextMenus: (ContextMenuData | CustomContextMenuData)[];
  @observable modals: ModalData[];
  @observable alerts: AlertData[];
  @observable queryMatch: Record<BreakPointKeys, boolean>;
  rootStore: Stores | null;

  constructor() {
    this.header = initalHeader;
    this.keyboardMargin = 0;
    this.contextMenus = [];
    this.modals = [];
    this.alerts = [];
    this.rootStore = null;
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

  bindRoot(rootStore: Stores) {
    this.rootStore = rootStore;
  }
}

export default UiStore;
