/* eslint-disable no-underscore-dangle */
import { ContextMenuData } from './ContextMenuViewer';
import global from '../../types/global';


export const useContextMenu = () => {
  const elementId = `contextMenu${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    const contextMenuElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (contextMenuElement) {
      contextMenuElement.style!.transform = 'scale(0.8)';
    }
    setTimeout(() => {
      global.__OWNER__.closeContextMenu(elementId);
    }, 300);
  };

  const open = (contextMenus: Omit<ContextMenuData, 'id' | 'handleClose'>) => {
    const contextMenuElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (contextMenuElement) {
      global.__OWNER__.closeContextMenu(elementId);
      global.__OWNER__.openContextMenu({
        ...contextMenus,
        id: elementId,
        handleClose: close,
      });
    } else {
      global.__OWNER__.openContextMenu({
        ...contextMenus,
        id: elementId,
        handleClose: close,
      });
    }
  };

  return {
    close,
    open,
  };
};
