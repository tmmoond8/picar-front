/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';
import FullButton from './FullButton';

interface ButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

function Button(props: ButtonProps): JSX.Element {
  const { icon, children, onClick, className } = props;
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );
  return (
    <StyledButton onClick={handleClick} className={className}>
      {icon && icon}
      {children && <span>{children}</span>}
    </StyledButton>
  );
}

const StyledButton = styled.button`
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

Button.Full = FullButton;

export default Button;
