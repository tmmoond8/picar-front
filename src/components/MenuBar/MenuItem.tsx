/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';

interface MenuItemProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

export default function MenuItem(props: MenuItemProps): JSX.Element {
  const { icon, name, onClick } = props;
  return (
    <Item onClick={onClick}>
      {icon}
      <p>{name}</p>
    </Item>
  );
}

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 74px;
  cursor: pointer;
  p {
    font-size: 10px;
    color: ${colors.black50};
  }
`;
