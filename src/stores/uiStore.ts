import { action, observable } from 'mobx';
import { initalHeader, HeaderProps, headerType } from '../components/Header';

export interface UiStoreInterface {
  header: HeaderProps;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
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
}

export default UiStore;
