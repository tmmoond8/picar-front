/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Icon from '../Icon';

const FloatingButton: React.FC<{ onClick: () => void; }> = ({
  onClick
}) => {
  return (
    <Button onClick={onClick} >
      <Icon icon="editRound" size="56px" />
    </Button>
  );
}

export default FloatingButton;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: -60px;
  padding: 0;
`;