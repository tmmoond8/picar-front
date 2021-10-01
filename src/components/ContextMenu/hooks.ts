/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ContextMenuData } from './ContextMenuViewer';
import { CustomContextMenuData } from './CustomContextMenuViewer';
import global from '../../types/global';

export const useContextMenu = () => {
  const elementId = `contextMenu${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    const contextMenuElement: HTMLElement | null = document.querySelector(
      `#${elementId}`,
    );
    if (contextMenuElement) {
      contextMenuElement.style!.opacity = '0';
    }
    setTimeout(() => {
      global.__OWNER__.closeContextMenu(elementId);
    }, 300);
  };

  type ContextMenu = Omit<ContextMenuData, 'id' | 'handleClose'>;
  type CustomContextMenu = Omit<CustomContextMenuData, 'id' | 'handleClose'>;

  const open = (contextMenu: ContextMenu | CustomContextMenu) => {
    const contextMenuElement: HTMLElement | null = document.querySelector(
      `#${elementId}`,
    );
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

const MARGIN = 6;
type AlignX = 'left' | 'center' | 'right';

export function usePosition(
  targetElement: HTMLElement,
  width: number,
  alignX: AlignX,
) {
  const [x, setX] = React.useState<string>('-1000px');
  const [y, setY] = React.useState<string>('0px');
  const targetRect = targetElement.getBoundingClientRect();
  const xPosition = targetRect.x + targetRect.width / 2;
  const yPosition = targetRect.y + targetRect.height;

  React.useEffect(() => {
    const { innerWidth } = window;
    if (xPosition + width / 2 + MARGIN > innerWidth) {
      setX(`${innerWidth - MARGIN - width}px`);
    } else {
      let positionX = xPosition - targetRect.width / 2;
      if (alignX === 'right')
        positionX = xPosition - width + targetRect.width / 2;
      if (alignX === 'center') positionX = xPosition - width / 2;
      setX(`${Math.max(positionX, 18)}px`);
    }
    setY(`${yPosition + MARGIN}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xPosition, yPosition, width]);

  return {
    x,
    y,
  };
}
