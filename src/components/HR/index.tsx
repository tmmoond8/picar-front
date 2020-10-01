/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';

interface HRProps {
  height?: number;
  color?: string;
  marginTop?: number;
}

export default function HR(props: HRProps): JSX.Element {
  const { height = 1, color, marginTop = 0 } = props;

  return <StyledHR height={height} color={color} marginTop={marginTop} />;
}

const StyledHR = styled.hr<HRProps>`
  width: 100%;
  height: ${(p) => p.height}px;
  margin: 0;
  margin-top: ${(p) => p.marginTop}px;
  background-color: ${(p) => (p.color ? p.color : colors.blackEB)};
  border: none;
  outline: none;
`;
