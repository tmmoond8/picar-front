/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import ModalHeader from './ModalHeader';
import { colors, constants } from '../../styles';
import { useStore, observer } from '../../stores';

export const HEADER_TYPE = {
  default: 'default',
  close: 'close',
  none: 'none',
} as const;

export type HeaderType = keyof typeof HEADER_TYPE;

interface ModalViewerProps {
  className?: string;
  id: string;
  title?: string;
  contents: React.ReactNode;
  noHeader?: boolean;
  handleClose: () => void;
  isFull?: boolean;
  hasTitleLine?: boolean;
  noBlur?: boolean;
  hasBottomCTA?: boolean;
}

export type ModalData = ModalViewerProps;

const ModalViewer = React.forwardRef(
  (props: ModalViewerProps, ref): JSX.Element => {
    const {
      className,
      id,
      title = '',
      noHeader = false,
      contents,
      handleClose,
      isFull = false,
      hasTitleLine = true,
      noBlur = false,
      hasBottomCTA = false,
    } = props;
    const { ui } = useStore();
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClickWrapper = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && !noBlur) {
          handleClose();
        }
      },
      [handleClose, noBlur],
    );

    React.useEffect(() => {
      if (!open) {
        setTimeout(() => {
          setOpen(true);
        }, 50);
      }
    }, [title, open]);
    return (
      <Wrapper
        onClick={handleClickWrapper}
        className={cx('ModalWrapper', className)}
        open={open}
        desktop={!ui.queryMatch.Mobile}
      >
        <ModalBox
          id={id}
          className="ModalBox"
          open={open}
          ref={ref as React.RefObject<HTMLDivElement>}
          isFull={isFull}
        >
          {!noHeader && (
            <ModalHeader
              title={title}
              handleClose={handleClose}
              noRadius={isFull}
              hasTitleLine={hasTitleLine}
            />
          )}
          <ModalBody hasBottomCTA={hasBottomCTA}>{contents}</ModalBody>
        </ModalBox>
      </Wrapper>
    );
  },
);

export default observer(ModalViewer);

const Wrapper = styled.div<{ open: boolean; desktop: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: ${constants.safeTop};
  bottom: ${constants.safeBottom};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  overflow: hidden;
  background-color: ${(p) => (p.open ? colors.dimmed : colors.notDimmed)};
  z-index: 10005;
  transition: background-color 0.2s ease 0s;
  ${(p) =>
    p.desktop &&
    css`
      align-items: center;
      .ModalBox {
        top: 0;
        max-width: 414px;
        max-height: 680px;
        border-radius: 3px;
        overflow: hidden;
        border-radius: 0;
        .ModalHeader {
          border-radius: 0;
        }
      }
    `}
`;

const ModalBox = styled.div<{ open: boolean; isFull: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ isFull }) => (isFull ? '100%' : 'auto')};
  width: 100%;
  transition: all 0.2s ease 0s;
  transform: translateY(${(p) => (p.open ? '0' : '100vh')});
`;

const ModalBody = styled.div<{ hasBottomCTA: boolean }>`
  flex: 1;
  padding: 0;
  background-color: ${colors.white};
  color: ${colors.black22};
  overflow: auto;
  ${(p) =>
    p.hasBottomCTA &&
    css`
      padding-bottom: 80px;
    `}
`;
