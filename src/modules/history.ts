import { Path, LocationState, History } from 'history';

export default (history: History<LocationState>) => {
  return {
    ...history,
    push: (path: Path, state?: LocationState) => {
      if (path === history.location.pathname) {
        return;
      }
      history.push(path);
    }
  };
}
