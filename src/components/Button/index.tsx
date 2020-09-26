/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

interface ButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { icon, children } = props;
  return (
    <Self>
      {icon && icon}
      {children && <span>{children}</span>}
    </Self>
  );
}

const Self = styled.button`
  display: flex;
  align-items: center;
  height: 28px;

  border-radius: 4px;
  border: solid 1px ${colors.blackEB};
  span {
    margin-left: 6px;
    font-size: 13px;
    color: ${colors.black66};
  }
  cursor: pointer;
`;
