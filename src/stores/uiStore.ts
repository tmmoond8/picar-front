import { action, observable } from 'mobx';
import { initalHeader, HeaderProps, headerType } from '../components/Header';

export interface UiStoreInterface {
  header: HeaderProps;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
  setHeaderBack: (options: Record<string, any>) => void;
  setHeaderClose: (options: Record<string, any>) => void;
}

class UiStore implements UiStoreInterface {
  @observable header: HeaderProps;

  constructor() {
    this.header = initalHeader;
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
}

export default UiStore;
