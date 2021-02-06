import { observable, action } from 'mobx';
import { createBrowserHistory, History, LocationState } from 'history';
import { Stores, CommonStore } from '.';

export interface UtilStoreInterface extends CommonStore {
  setHistory: (history: History<LocationState>) => void;
  useHistory: () => History<LocationState>;
  history: History<LocationState>;
}

let historySet = false;

class UtilsStore implements UtilStoreInterface {
  @observable history: History<LocationState>;
  rootStore: Stores | null;

  constructor() {
    this.history = createBrowserHistory();
    this.rootStore = null;
  }

  @action
  setHistory(history: History<LocationState>) {
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
