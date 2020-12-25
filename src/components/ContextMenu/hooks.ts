/* eslint-disable no-underscore-dangle */
import { ContextMenuData } from './ContextMenuViewer';
import global from '../../types/global';

let isOpen = false;
const elementId = 'ContextMenu';

export const useContextMenu = () => {
  const close = () => {
    isOpen = false;
    const bottomSheetEl: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (bottomSheetEl) {
      bottomSheetEl.style!.transform = 'scale(0.8)';
    }
    setTimeout(() => {
      global.__OWNER__.closeContextMenu();
    }, 300);
  };

  const open = (contextMenus: Omit<ContextMenuData, 'handleClose'>) => {
    if (isOpen) {
      setTimeout(() => {
        global.__OWNER__.openContextMenu({
          ...contextMenus,
          handleClose: close,
        });
      }, 310);
    } else {
      global.__OWNER__.openContextMenu({
        ...contextMenus,
        handleClose: close,
      });
    }

    isOpen = true;
  };

  return {
    close,
    open,
  };
};
