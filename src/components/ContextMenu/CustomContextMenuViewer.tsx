/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

const MARGIN = 6;
const WIDTH = 147;

export interface CustomContextMenuData {
  id: string;
  xPosition: number;
  yPosition: number;
  handleClose: () => void;
  contents: React.ReactNode;
}

const CustomContextMenuViewer: React.FC<CustomContextMenuData> = ({
  id,
  xPosition,
  yPosition,
  contents,
  handleClose,
}) => {
  const { x, y } = usePosition(xPosition, yPosition);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [ref]);

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
  top: ${(p) => p.y};
  left: ${(p) => p.x};
  padding: 4px 0;
  border-radius: 2px;
  background-color: ${colors.white};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  outline: none;
  z-index: 11000;
  transition: transform 0.3s, opacity 0.2s;
  animation: ${popup} 0.1s ease-out;
`;

function usePosition(xPosition: number, yPosition: number) {
  const [x, setX] = React.useState<string>('-1000px');
  const [y, setY] = React.useState<string>('0px');

  React.useEffect(() => {
    const { innerWidth } = window;
    if (xPosition + WIDTH / 2 + MARGIN > innerWidth) {
      setX(`${innerWidth - MARGIN - WIDTH}px`);
    } else {
      setX(`${Math.max(xPosition - WIDTH / 2, 18)}px`);
    }
    setY(`${yPosition + MARGIN}px`);
  }, [xPosition, yPosition]);

  return {
    x,
    y,
  };
}
