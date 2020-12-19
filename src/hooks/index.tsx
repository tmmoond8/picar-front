/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { Profile as UserProfile } from '../types/User';
import LoginBox from '../components/Login/LoginBox';
import * as inputHooks from './input';
import { BottomSheet } from '../components/BottomSheet';

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

export const useCheckLogin = (
  handleSetUserProfile: (profile: UserProfile) => void,
  bottomSheet: BottomSheet,
) => {
  return React.useCallback(
    (code: string) => {
      if (code === 'guest') {
        bottomSheet.open({
          title: '',
          contents: (
            <LoginBox
              onClose={bottomSheet.close}
              onSetUserProfile={handleSetUserProfile}
            />
          ),
        });

        return true;
      }
      return false;
    },
    [bottomSheet, handleSetUserProfile],
  );
};
