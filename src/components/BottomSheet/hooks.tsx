/* eslint-disable no-underscore-dangle */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import ReactDOM from 'react-dom';
import BottomSheet from './BottomSheet';
import global from '../../types/global';
import { HeaderType } from './BottomSheet';

export const useBottomSheet = () => {
  const WRAPPER = 'OwnerBottomSheetWrapper';
  const bodyElement = document.querySelector('body');
  const bottomSheetRef = React.useRef<HTMLDivElement>(null);
  let bottomSheetWrapper: HTMLDivElement | null = null;

  const close = () => {
    if (bodyElement && bottomSheetRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      bottomSheetRef.current!.style!.transform = 'translateY(100vh)';
      setTimeout(() => {
        if (bottomSheetWrapper) {
          bodyElement.removeChild(bottomSheetWrapper);
          bottomSheetWrapper = null;
        }
      }, 300);
    }
  };

  global.__OWNER__.closeBottomSheet = close;

  const open = (params: {
    title: string;
    contents: React.ReactNode;
    headerType?: HeaderType;
    isFull?: boolean;
  }) => {
    const { title, contents, headerType, isFull } = params;
    const bottomSheet = (
      <BottomSheet
        title={title}
        headerType={headerType}
        handleClose={close}
        ref={bottomSheetRef}
        contents={contents}
        isFull={isFull}
      />
    );
    bottomSheetWrapper = document.createElement('div');
    bottomSheetWrapper.classList.add(WRAPPER);
    if (bodyElement && bottomSheetWrapper) {
      ReactDOM.render(bottomSheet, bottomSheetWrapper);
      bodyElement.appendChild(bottomSheetWrapper);
    }
  };

  return {
    open,
    close,
  };
};

export const useCloseCallback = () => () => global.__OWNER__.closeBottomSheet();
