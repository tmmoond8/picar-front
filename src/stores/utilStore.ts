import { observable, action } from 'mobx';
import { createMemoryHistory, LocationState } from 'history';
import { CustomHistory } from '../modules/history';
import { Stores, CommonStore } from '.';

export interface UtilStoreInterface extends CommonStore {
  setHistory: (history: CustomHistory<LocationState>) => void;
  useHistory: () => CustomHistory<LocationState>;
  history: CustomHistory<LocationState>;
}

let historySet = false;

class UtilsStore implements UtilStoreInterface {
  @observable history: CustomHistory<LocationState>;
  rootStore: Stores | null;

  constructor() {
    this.history = createMemoryHistory() as any;
    this.rootStore = null;
  }

  @action
  setHistory(history: CustomHistory<LocationState>) {
    if (!historySet) {
      this.history = history;
      historySet = true;
    }
  }

  useHistory() {
    return this.history;
  }

  bindRoot(rootStore: Stores) {
    this.rootStore = rootStore;
  }
}

export default UtilsStore;
