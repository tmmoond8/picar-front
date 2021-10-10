/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

interface SpacingProps {
  size: number;
}

const This = styled.div<{ size: number }>`
  display: inline-block;
  margin-top: ${(p) => p.size}px;
`;

export default function Spacing(props: SpacingProps): JSX.Element {
  return <This size={props.size} />;
}
