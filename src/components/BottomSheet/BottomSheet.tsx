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

import BottomSheetHeader from '../Header/BottomSheetHeader';
import CloseHeader from '../Header/CloseHeader';
import { colors, desktop } from '../../styles';
import { useStore, observer } from '../../stores';

export const HEADER_TYPE = {
  default: 'default',
  close: 'close',
  none: 'none',
} as const;

export type HeaderType = keyof typeof HEADER_TYPE;

export interface BottomSheetProps {
  className?: string;
  id: string;
  title?: string;
  headerType?: HeaderType;
  contents: ReactNode;
  handleClose: () => void;
  isFull?: boolean;
}

const BottomSheet = forwardRef(
  (props: BottomSheetProps, ref): JSX.Element => {
    const {
      className,
      id,
      title = '',
      contents,
      handleClose,
      headerType = HEADER_TYPE.default,
      isFull = false,
    } = props;
    const stores = useStore();
    console.log(stores);
    const [open, setOpen] = useState<boolean>(false);
    const handleClickWrapper = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      },
      [handleClose],
    );

    const Header = React.useMemo(() => {
      if (headerType === HEADER_TYPE.close) {
        return <CloseHeader options={{ title }} onClose={handleClose} />;
      }
      if (headerType === HEADER_TYPE.none) {
        return <React.Fragment />;
      }
      return <BottomSheetHeader title={title} handleClose={handleClose} />;
    }, [handleClose, headerType, title]);

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
          {Header}
          <BottomSheetBody>{contents}</BottomSheetBody>
        </BottomSheetBox>
      </Wrapper>
    );
  },
);

export default observer(BottomSheet);

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  font-family: 'Inter', Helvetica, 'Apple Color Emoji', Arial, sans-serif,
    'Segoe UI Emoji', 'Segoe UI Symbol';
  overflow: hidden;
  background-color: ${(p) => (p.open ? colors.dimmed : colors.notDimmed)};
  z-index: 2000;
  transition: background-color 0.2s ease 0s;
`;

const BottomSheetBox = styled.div<{ open: boolean; isFull: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${({ isFull }) => (isFull ? '0' : 'auto')};
  left: 0;
  right: 0;
  bottom: 0;
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
