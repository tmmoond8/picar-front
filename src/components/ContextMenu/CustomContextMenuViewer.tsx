/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { usePosition } from './hooks';
import { colors } from '../../styles';

type AlignX = 'left' | 'center' | 'right';

export interface CustomContextMenuData {
  id: string;
  targetElement: HTMLElement;
  alignX?: AlignX;
  handleClose: () => void;
  contents: React.ReactNode;
}

const CustomContextMenuViewer: React.FC<CustomContextMenuData> = ({
  id,
  targetElement,
  alignX = 'center',
  contents,
  handleClose,
}) => {
  const [width, setWidth] = React.useState(0);
  const { x, y } = usePosition(targetElement, width, alignX);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [ref]);
  React.useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, []);

  return (
    <StyledCustomContextMenus
      tabIndex={-1}
      ref={ref}
      id={id}
      x={x}
      y={y}
      onBlur={handleClose}
    >
      {contents}
    </StyledCustomContextMenus>
  );
};

export default React.memo(CustomContextMenuViewer);

const popup = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0.2;
  } 
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledCustomContextMenus = styled.div<{ x: string; y: string }>`
  position: fixed;
  width: auto;
  max-height: 480px;
  top: ${(p) => p.y};
  left: ${(p) => p.x};
  padding: 4px 0;
  overflow-y: auto;
  border-radius: 2px;
  background-color: ${colors.white};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  outline: none;
  z-index: 11000;
  transition: transform 0.3s, opacity 0.2s;
  animation: ${popup} 0.1s ease-out;
`;
