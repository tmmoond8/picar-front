/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { constants } from '../../styles';
import Icon from '../Icon';

const FloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon icon="editRound" size="56px" />
    </Button>
  );
};

export default FloatingButton;

const Button = styled.button`
  position: fixed;
  right: 10px;
  bottom: calc(${constants.safeBottom} + 60px);
  padding: 0;
  cursor: pointer;
  z-index: 2000;
`;
