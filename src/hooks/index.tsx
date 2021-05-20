/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { isHybrid } from '../modules/crossPlatform';
import { Profile as UserProfile } from '../types/User';
import createHistory from '../modules/history';
import LoginBox from '../components/Login/LoginBox';
import * as inputHooks from './input';
import { useStore } from '../stores';
import { BreakPoints } from '../styles/mediaQuery';
import { useModal } from '../components/Modal';
import * as auth from './auth';

export { default as useOG } from './og';
export { useAndroid } from './android';

export default {
  auth,
}
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
  modal: ReturnType<typeof useModal>,
) => {
  return React.useCallback(
    (code: string) => {
      if (code === 'guest') {
        modal.open({
          title: '',
          contents: (
            <LoginBox
              onClose={modal.close}
            />
          ),
          hasTitleLine: false,
        });

        return true;
      }
      return false;
    },
    [modal, handleSetUserProfile],
  );
};

export const useSetupHistory = () => {
  const { util } = useStore();
  const history = useHistory();
  util.setHistory(createHistory(history));
};

type BreakPointKyes = keyof typeof BreakPoints;
export const useBreakpoint = () => {
  const mobileValue = React.useRef<boolean>(false);
  const tabletValue = React.useRef<boolean>(false);
  const desktopValue = React.useRef<boolean>(false);
  const [queryMatch, setQueryMatch] = React.useState<
    Record<BreakPointKyes, boolean>
  >({
    Mobile: false,
    Tablet: false,
    Desktop: false,
  });
  React.useEffect(() => {
    if (isHybrid()) {
      return;
    }
    const mobile = window.matchMedia(`(max-width: ${BreakPoints.Tablet}px)`);
    mobile.addEventListener(
      'change',
      () => {
        mobileValue.current = mobile.matches;
        setTimeout(() => {
          setQueryMatch({
            Mobile: mobileValue.current,
            Tablet: tabletValue.current,
            Desktop: desktopValue.current,
          });
        }, 50);
      }
        ,
    );
    const tablet = window.matchMedia(
      `(min-width: ${BreakPoints.Tablet}px) and (max-width: ${BreakPoints.Desktop}px)`,
    );
    tablet.addEventListener('change', () => {
      tabletValue.current = tablet.matches;
      setTimeout(() => {
        setQueryMatch({
          Mobile: mobileValue.current,
          Tablet: tabletValue.current,
          Desktop: desktopValue.current,
        });
      }, 50);
    });
    const desktop = window.matchMedia(`(min-width: ${BreakPoints.Desktop}px)`);
    desktop.addEventListener(
      'change',
      () => {
        desktopValue.current = desktop.matches;
        setTimeout(() => {
          setQueryMatch({
            Mobile: mobileValue.current,
            Tablet: tabletValue.current,
            Desktop: desktopValue.current,
          });
        }, 50);
      },
    );
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      const width = window.innerWidth;
      if (isHybrid()) {
        return setQueryMatch({
          Mobile: true,
          Tablet: false,
          Desktop: false,
        });
      }
      setQueryMatch({
        Mobile: width <= BreakPoints.Tablet,
        Tablet: width > BreakPoints.Tablet && width <= BreakPoints.Desktop,
        Desktop: width > BreakPoints.Desktop,
      });
    }, 50);
  }, []);

  return queryMatch;
};
