import ContextMenuViewer, { ContextMenuData as _ContextMenuData } from './ContextMenuViewer';

export { useContextMenu } from './hooks';

export default ContextMenuViewer;

export type ContextMenuData = _ContextMenuData;

export const getElementPosition = (element: HTMLElement) => {
  const {
    x,
    width,
    y,
    height,
  } = element.getBoundingClientRect();

  return {
    xPosition: x + width / 2,
    yPosition: y + height,
  }
}