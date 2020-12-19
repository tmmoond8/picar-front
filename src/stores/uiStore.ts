import { action, observable } from 'mobx';
import { BottomSheetData } from '../components/BottomSheet';
import { initalHeader, HeaderProps, headerType } from '../components/Header';

type BottomSheetQueueItem = BottomSheetData & {
  id: string;
}

export interface UiStoreInterface {
  header: HeaderProps;
  keyboardMargin: number;
  bottomSheetQueue: BottomSheetQueueItem[];
  removeBottomSheet: (id: string) => void;
  addBottomSheet: (bottomSheet: BottomSheetQueueItem) => void;
  setHeaderNavigation: () => void;
  setHeaderNone: () => void;
  setHeaderBack: (options: Record<string, any>) => void;
  setHeaderClose: (options: Record<string, any>) => void;
  setKeyboardMargin: (height: number) => void;
}

class UiStore implements UiStoreInterface {
  @observable header: HeaderProps;
  @observable keyboardMargin: number;
  @observable bottomSheetQueue: BottomSheetQueueItem[];

  constructor() {
    this.header = initalHeader;
    this.keyboardMargin = 0;
    this.bottomSheetQueue = [];
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

  @action
  addBottomSheet(bototmSheet: BottomSheetQueueItem) {
    this.bottomSheetQueue = [ ...this.bottomSheetQueue, bototmSheet ]
  }

  @action
  removeBottomSheet(id: string) {
    this.bottomSheetQueue = this.bottomSheetQueue.filter(qItem => qItem.id !== id)
  }
  
}

export default UiStore;
