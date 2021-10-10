/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

const LoungeSelector: React.FC = () => {
  return (
    <StyledLoungeSelector className="LoungeSelector">
      LoungeSelector
    </StyledLoungeSelector>
  );
};

export default LoungeSelector;

const StyledLoungeSelector = styled.div`
  width: 300px;
  height: 262px;
  background-color: aqua;
`;
