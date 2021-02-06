/* eslint-disable no-underscore-dangle */
import { ContextMenuData } from './ContextMenuViewer';
import global from '../../types/global';


export const useContextMenu = () => {
  const elementId = `contextMenu${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    const contextMenuElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (contextMenuElement) {
      contextMenuElement.style!.opacity = '0';
    }
    setTimeout(() => {
      global.__OWNER__.closeContextMenu(elementId);
    }, 300);
  };

  const open = (contextMenu: Omit<ContextMenuData, 'id' | 'handleClose'>) => {
    const contextMenuElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (contextMenuElement) {
      global.__OWNER__.closeContextMenu(elementId);
      global.__OWNER__.openContextMenu({
        ...contextMenu,
        id: elementId,
        handleClose: close,
      });
    } else {
      global.__OWNER__.openContextMenu({
        ...contextMenu,
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
