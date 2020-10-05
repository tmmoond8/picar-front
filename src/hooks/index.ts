import React from 'react';

import * as inputHooks from './input';

export const useTextInput = inputHooks.useTextInput;
export const useTextarea = inputHooks.useTextarea;

export const useInitBefore = (callback: () => void) => {
  const [init, setInit] = React.useState(false);
  React.useEffect(() => {
    if (!init) {
      callback();
      setInit(true);
    }
  }, [callback, init]);
};
