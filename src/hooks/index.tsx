/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Profile as UserProfile } from '../types/User';
import LoginBox from '../components/Login/LoginBox';
import * as inputHooks from './input';
import { useStore } from '../stores';
import { useBottomSheet } from '../components/BottomSheet';

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
  bottomSheet: ReturnType<typeof useBottomSheet>,
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

export const useSetupHistory = () => {
  const { util } = useStore();
  const history = useHistory();
  util.setHistory(history);
};
