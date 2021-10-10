/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

export default function SpaceBetween({
  children,
  className,
}: React.HtmlHTMLAttributes<HTMLElement>) {
  return (
    <StyledSpaceBetween className={className}>{children}</StyledSpaceBetween>
  );
}

const StyledSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
