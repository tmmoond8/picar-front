/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

const SpaceBetween: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <StyledSpaceBetween>
      {children}
    </StyledSpaceBetween>
  )
}

export default SpaceBetween;

const StyledSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;