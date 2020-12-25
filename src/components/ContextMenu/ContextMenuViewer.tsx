/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

interface ContextMenu {
  name: string;
  onClick: () => void;
}

const MARGIN = 18;
const WIDTH = 147;

export interface ContextMenuData {
  xPosition: number;
  yPosition: number;
  menus: ContextMenu[];
  handleClose: () => void;
}

const ContextMenuViewer: React.FC<ContextMenuData> = ({
  xPosition,
  yPosition,
  menus,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { x, y } = usePosition(xPosition, yPosition);
  return (
    <StyledContextMenus x={x} y={y}>
      {menus.map(({ name, onClick }) => (
        <Menu key={name} onClick={onClick}>
          {name}
        </Menu>
      ))}
    </StyledContextMenus>
  );
};

export default React.memo(ContextMenuViewer);

const StyledContextMenus = styled.ul<{ x: string; y: string }>`
  position: fixed;
  width: ${WIDTH}px;
  top: ${(p) => p.y};
  left: ${(p) => p.x};
  padding: 4px 0;
  border-radius: 4px;
  background-color: ${colors.white};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

const Menu = styled.li`
  height: 48px;
  line-height: 48px;
  text-align: center;
`;

function usePosition(xPosition: number, yPosition: number) {
  const [x, setX] = React.useState<string>('-1000px');
  const [y, setY] = React.useState<string>('0px');

  React.useEffect(() => {
    const { innerWidth } = window;
    if (xPosition + WIDTH / 2 + MARGIN > innerWidth) {
      console.log('over');
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
