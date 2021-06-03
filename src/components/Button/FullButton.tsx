/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

interface FullButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function FullButton(props: FullButtonProps): JSX.Element {
  const { children, onClick, className, disabled = false } = props;
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClick();
    },
    [onClick],
  );
  return (
    <StyledFullButton
      onClick={handleClick}
      className={className}
      disabled={disabled}
    >
      {children && <span>{children}</span>}
    </StyledFullButton>
  );
}

const StyledFullButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;
  background-color: ${colors.primary3};
  color: ${colors.black22};
  border-radius: 7px;

  span {
    margin-left: 6px;
    font-size: 17px;
    letter-spacing: -0.25px;
  }
  cursor: pointer;

  ${(p) =>
    p.disabled &&
    css`
      background-color: ${colors.blackCC};
      color: ${colors.black99};
    `}
`;
