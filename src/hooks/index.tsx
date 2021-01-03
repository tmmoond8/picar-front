/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Profile as UserProfile } from '../types/User';
import LoginBox from '../components/Login/LoginBox';
import * as inputHooks from './input';
import { useStore } from '../stores';
import { BreakPoints } from '../styles/mediaQuery';
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
          hasTitleLine: false,
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

type BreakPointKyes = keyof typeof BreakPoints;
export const useBreakpoint = () => {
  const mobileValue = React.useRef<boolean>(false);
  const desktopValue = React.useRef<boolean>(false);
  const [queryMatch, setQueryMatch] = React.useState<
    Record<BreakPointKyes, boolean>
  >({
    Mobile: false,
    Tablet: false,
    Desktop: false,
  });
  React.useEffect(() => {
    const mobile = window.matchMedia(`(max-width: ${BreakPoints.Tablet}px)`);
    mobile.addEventListener(
      'change',
      () =>
        // setQueryMatch({ ...queryMatch, Mobile: mobile.matches }),
        (mobileValue.current = mobile.matches),
    );
    const tablet = window.matchMedia(
      `(min-width: ${BreakPoints.Tablet}px) and (max-width: ${BreakPoints.Desktop}px)`,
    );
    tablet.addEventListener('change', () => {
      setTimeout(() => {
        setQueryMatch({
          Mobile: mobileValue.current,
          Tablet: tablet.matches,
          Desktop: desktopValue.current,
        });
      }, 50);
    });
    const desktop = window.matchMedia(`(min-width: ${BreakPoints.Desktop}px)`);
    desktop.addEventListener(
      'change',
      () =>
        // setQueryMatch({ ...queryMatch, Desktop: desktop.matches }),
        (desktopValue.current = desktop.matches),
    );
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      const width = window.innerWidth;

      setQueryMatch({
        Mobile: width <= BreakPoints.Tablet,
        Tablet: width > BreakPoints.Tablet && width <= BreakPoints.Desktop,
        Desktop: width > BreakPoints.Desktop,
      });
    }, 50);
  }, []);

  return queryMatch;
};
