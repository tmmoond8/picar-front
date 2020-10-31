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
  return (
    <StyledFullButton
      onClick={onClick}
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
  background-color: ${colors.primary};
  color: ${colors.white};

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
