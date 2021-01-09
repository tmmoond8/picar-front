/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import {
  ReactNode,
  useState,
  useEffect,
  RefObject,
  forwardRef,
  useCallback,
  MouseEvent,
} from 'react';
import cx from 'classnames';

import BottomSheetHeader from './BottomSheetHeader';
import { colors, desktop } from '../../styles';
import { observer } from '../../stores';

export const HEADER_TYPE = {
  default: 'default',
  close: 'close',
  none: 'none',
} as const;

export type HeaderType = keyof typeof HEADER_TYPE;

interface BottomSheetViewerProps {
  className?: string;
  id: string;
  title?: string;
  contents: ReactNode;
  noHeader?: boolean;
  handleClose: () => void;
  isFull?: boolean;
  hasTitleLine?: boolean;
}

export type BottomSheetData = BottomSheetViewerProps;

const BottomSheetViewer = forwardRef(
  (props: BottomSheetViewerProps, ref): JSX.Element => {
    const {
      className,
      id,
      title = '',
      noHeader = false,
      contents,
      handleClose,
      isFull = false,
      hasTitleLine = true,
    } = props;
    const [open, setOpen] = useState<boolean>(false);
    const handleClickWrapper = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      },
      [handleClose],
    );

    useEffect(() => {
      if (!open) {
        setTimeout(() => {
          setOpen(true);
        }, 300);
      }
    }, [title, open]);
    return (
      <Wrapper
        onClick={handleClickWrapper}
        className={cx('BottomSheetWrapper', className)}
        open={open}
      >
        <BottomSheetBox
          id={id}
          open={open}
          ref={ref as RefObject<HTMLDivElement>}
          isFull={isFull}
        >
          {!noHeader && <BottomSheetHeader
            title={title}
            handleClose={handleClose}
            noRadius={isFull}
            hasTitleLine={hasTitleLine}
          />}
          <BottomSheetBody>{contents}</BottomSheetBody>
        </BottomSheetBox>
      </Wrapper>
    );
  },
);

export default observer(BottomSheetViewer);

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: env(safe-area-inset-bottom);
  margin: auto;
  font-family: 'Inter', Helvetica, 'Apple Color Emoji', Arial, sans-serif,
    'Segoe UI Emoji', 'Segoe UI Symbol';
  overflow: hidden;
  background-color: ${(p) => (p.open ? colors.dimmed : colors.notDimmed)};
  z-index: 2005;
  transition: background-color 0.2s ease 0s;
`;

const BottomSheetBox = styled.div<{ open: boolean; isFull: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${({ isFull }) => (isFull ? '0' : 'auto')};
  left: 0;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  margin: auto;
  height: auto;
  width: 100%;
  transition: all 0.2s ease 0s;
  transform: translateY(${(p) => (p.open ? '0' : '100vh')});

  ${desktop(
    css`
      max-width: 414px;
      max-height: 484px;
      border-radius: 3px;
      overflow: hidden;
    `,
  )}
`;

const BottomSheetBody = styled.div`
  flex: 1;
  padding: 0;
  background-color: ${colors.white};
  color: ${colors.black22};
  overflow: scroll;
`;
