/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';

interface HRProps {
  height?: number;
  color?: string;
  marginTop?: number;
  full?: boolean;
}

export default function HR(props: HRProps): JSX.Element {
  const { height = 1, color, marginTop = 0, full } = props;
  return (
    <StyledHR height={height} color={color} marginTop={marginTop} full={full} />
  );
}

const StyledHR = styled.hr<HRProps>`
  width: auto;
  height: ${(p) => p.height}px;
  margin: 0;
  background-color: ${(p) => (p.color ? p.color : colors.blackEB)};
  border: none;
  outline: none;
  ${(p) =>
    p.full &&
    css`
      margin: 0 -18px 0 -18px;
    `};
  margin-top: ${(p) => p.marginTop}px;
`;
