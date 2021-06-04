/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { usePosition } from './hooks';
import { colors } from '../../styles';

type AlignX = 'left' | 'center' | 'right';
interface ContextMenu {
  name: string;
  onClick: () => void;
  underline?: boolean;
}

export interface ContextMenuData {
  id: string;
  targetElement: HTMLElement;
  alignX?: AlignX;
  menus: ContextMenu[];
  handleClose: () => void;
}

const ContextMenuViewer: React.FC<ContextMenuData> = ({
  id,
  targetElement,
  alignX = 'center',
  menus,
  handleClose,
}) => {
  const [width, setWidth] = React.useState(0);
  const { x, y } = usePosition(targetElement, width, alignX);
  const ref = React.useRef<HTMLUListElement>(null);
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
  }, [])

  return (
    <StyledContextMenus
      tabIndex={-1}
      ref={ref}
      id={id}
      x={x}
      y={y}
      onBlur={handleClose}
    >
      {menus.map(({ name, onClick, underline }) => (
        <Menu key={name} onClick={onClick} underline={!!underline}>
          {name}
        </Menu>
      ))}
    </StyledContextMenus>
  );
};

export default React.memo(ContextMenuViewer);

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

const StyledContextMenus = styled.ul<{ x: string; y: string }>`
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

const Menu = styled.li<{ underline: boolean }>`
  display: flex;
  align-items: center;
  width: 160px;
  height: 48px;
  padding: 0 20px;
  ${p => p.underline && css`
    border-bottom: 1px solid ${colors.blackF5F6F7};
  `}
  cursor: pointer;
  :hover {
    background-color: ${colors.blackEB};
  }
`;
