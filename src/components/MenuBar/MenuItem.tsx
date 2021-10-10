/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';

interface MenuItemProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  className?: string;
  hasNoti?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  name,
  onClick,
  className,
  hasNoti = false,
}) => {
  return (
    <Item
      onClick={onClick}
      className={cx('MenuBarItem', className)}
      hasNoti={hasNoti}
    >
      {icon}
      <p>{name}</p>
    </Item>
  );
};

export default MenuItem;

const Item = styled.li<{ hasNoti: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 74px;
  cursor: pointer;

  p {
    font-size: 10px;
  }

  &::after {
    content: ${(p) => (p.hasNoti ? "''" : 'none')};
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 6px;
    height: 6px;
    margin: 0 auto;
    transform: translateX(12px);
    background-color: ${colors.primary};
    border-radius: 6px;
  }
`;
