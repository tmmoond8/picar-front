import { Path, LocationState, History } from 'history';
import sessionStorage from '../modules/sessionStorage'

export default (history: History<LocationState>) => {
  sessionStorage.initStack();
  return {
    ...history,
    push: (path: Path, state?: LocationState) => {
      console.log('custom push');
      if (path === history.location.pathname) {
        console.log('match', path, history.location.pathname);
        return history.replace(path, state);
      }
      history.push(path, state);
    },
    replace: (path: Path, state?: LocationState) => {
      console.log('custom replace');
      if (path !== history.location.pathname) {
        return history.replace(path, state);
      }
    },
  };
}
