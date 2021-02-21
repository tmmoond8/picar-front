/* eslint-disable no-underscore-dangle */
import { ContextMenuData } from './ContextMenuViewer';
import { CustomContextMenuData } from './CustomContextMenuViewer';
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

  type ContextMenu = Omit<ContextMenuData, 'id' | 'handleClose'>
  type CustomContextMenu = Omit<CustomContextMenuData, 'id' | 'handleClose'>

  const open = (contextMenu: ContextMenu | CustomContextMenu) => {
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
