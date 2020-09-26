/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Navigation from './Navigation';

export default function Header(): JSX.Element {
  return (
    <Self>
      <Navigation />
    </Self>
  );
}

const Self = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
`;
