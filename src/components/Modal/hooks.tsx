/* eslint-disable no-underscore-dangle */
import { ModalData } from './ModalViewer';
import global from '../../types/global';
import { useStore } from '../../stores';

let isOpen = false;

export const useModal = () => {
  const { ui }  = useStore();
  const id = `modal${Math.random().toString(32).split('.')[1]}`;
  const close = () => {
    isOpen = false;
    const modalEl: HTMLElement | null = document.querySelector(`#${id}`);
    if (modalEl && ui.queryMatch.Mobile) {
      modalEl.style!.transform = 'translateY(100vh)';
    }

    if (ui.queryMatch.Mobile) {
      setTimeout(() => {
        global.__OWNER__.closeModal(id);
      }, 300);
    } else {
      global.__OWNER__.closeModal(id);
    }
  };

  const open = (modal: Omit<ModalData, 'id' | 'handleClose'>) => {
    if (isOpen) {
      setTimeout(() => {
        global.__OWNER__.openModal({
          ...modal,
          id,
          handleClose: close,
        });
      }, 310);
    } else {
      global.__OWNER__.openModal({
        ...modal,
        id,
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

export type Modal = ReturnType<typeof useModal>;
