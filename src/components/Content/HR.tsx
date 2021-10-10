/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../../styles';

interface HRProps {
  size: number;
  color?: string;
}

const StyledHR = styled.div<{ size: number; color?: string }>`
  display: block;
  height: ${(p) => p.size}px;
  width: 100%;
  background-color: ${(p) => (p.color ? p.color : colors.blackEB)};
`;

export default function HR(props: HRProps): JSX.Element {
  return <StyledHR size={props.size} color={props.color} />;
}
