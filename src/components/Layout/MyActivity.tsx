/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

const MyActivity: React.FC = () => {
  return <StyledMyActivity className="MyActivity">MyActivity</StyledMyActivity>;
};

export default MyActivity;

const StyledMyActivity = styled.div`
  width: 300px;
  height: 283px;
  background-color: tomato;
`;
