import { Path, LocationState, History } from 'history';
import sessionStorage from '../modules/sessionStorage';
export interface CustomHistory<T> extends History<T> {
  goBack: () => number;
}

export default (
  history: History<LocationState>,
): CustomHistory<LocationState> => {
  sessionStorage.initStack();
  return {
    ...history,
    push: (path: Path, state?: LocationState) => {
      const currentStack = sessionStorage.top();
      if (!currentStack) return;
      console.log('custom push');
      if (path === history.location.pathname) {
        console.log('match', path, history.location.pathname);
        history.replace(path, state);
        return currentStack;
      }
      sessionStorage.pushStack();
      history.push(path, state);
      return currentStack + 1;
    },
    replace: (path: Path, state?: LocationState) => {
      console.log('custom replace');
      if (path !== history.location.pathname) {
        return history.replace(path, state);
      }
    },
    goBack: () => {
      const stack = sessionStorage.popStack();
      if (!stack) return 0;
      if (stack !== -1) {
        history.goBack();
      } else {
        history.replace('/');
      }
      return stack;
    },
  };
};
