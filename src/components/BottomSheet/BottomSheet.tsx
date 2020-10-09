/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
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

import BottomSheetHead from './BottomSheetHead';
import { desktop } from '../../styles/mediaQuery';
import { colors } from '../../styles';

export interface BottomSheetProps {
  className?: string;
  title: string;
  contents: ReactNode;
  handleClose: () => void;
}

const BottomSheet = forwardRef(
  (props: BottomSheetProps, ref): JSX.Element => {
    const { className, title, contents, handleClose } = props;
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
        <BottomSheetBox open={open} ref={ref as RefObject<HTMLDivElement>}>
          <BottomSheetHead title={title} handleClose={handleClose} />
          <BottomSheetBody>{contents}</BottomSheetBody>
        </BottomSheetBox>
      </Wrapper>
    );
  },
);

export default BottomSheet;

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

const BottomSheetBox = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
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
