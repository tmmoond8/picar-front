import ContextMenuViewer, { ContextMenuData as _ContextMenuData } from './ContextMenuViewer';
import _CustomContextMenuViewer, { CustomContextMenuData as _CustomContextMenuData } from './CustomContextMenuViewer';

export { useContextMenu } from './hooks';
export const CustomContextMenuViewer = _CustomContextMenuViewer;
export default ContextMenuViewer;
export type CustomContextMenuData = _CustomContextMenuData;
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