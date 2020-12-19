/* eslint-disable no-underscore-dangle */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { BottomSheetProps } from './BottomSheet';
import global from '../../types/global';

export const useBottomSheet = () => {
  const id = `bottomSheet${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    const bottomSheetEl: HTMLElement | null = document.querySelector(`#${id}`);
    if (bottomSheetEl) {
      bottomSheetEl.style!.transform = 'translateY(100vh)';
    }
    setTimeout(() => {
      global.__OWNER__.closeBottomSheet(id);
    }, 300);
  };

  const open = (bottomSheet: Omit<BottomSheetProps, 'id' | 'handleClose'>) => {
    global.__OWNER__.openBottomSheet({
      ...bottomSheet,
      id,
      handleClose: close,
    });
  };

  return {
    close,
    open,
  };
};
