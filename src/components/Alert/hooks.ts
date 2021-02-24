/* eslint-disable no-underscore-dangle */
import { AlertData } from './AlertViewer';
import global from '../../types/global';

export const useAlert = () => {
  const elementId = `alert${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    const alertElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (alertElement) {
      alertElement.style!.opacity = '0';
    }
    global.__OWNER__.closeAlert(elementId);
  };

  const open = (alertData: Omit<AlertData, 'id' | 'handleClose'>) => {
    const alertElement: HTMLElement | null = document.querySelector(`#${elementId}`);
    if (alertElement) {
      global.__OWNER__.closeAlert(elementId);
      global.__OWNER__.openAlert({
        ...alertData,
        id: elementId,
        handleClose: close,
      });
    } else {
      global.__OWNER__.openAlert({
        ...alertData,
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
