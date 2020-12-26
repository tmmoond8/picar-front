import { observable, action } from 'mobx';
import { createBrowserHistory, History, LocationState } from 'history';

export interface UtilStoreInterface {
  setHistory: (history: History<LocationState>) => void;
  useHistory: () => History<LocationState>;
  history: History<LocationState>;
}

let historySet = false;

class UtilsStore implements UtilStoreInterface {
  @observable history: History<LocationState>;

  constructor() {
    this.history = createBrowserHistory();
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
}

export default UtilsStore;
