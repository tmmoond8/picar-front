/* eslint-disable no-underscore-dangle */
import { BottomSheetData } from './BottomSheetViewer';
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

  const open = (bottomSheet: Omit<BottomSheetData, 'id' | 'handleClose'>) => {
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
