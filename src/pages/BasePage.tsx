/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useSetupHistory } from '../hooks';

const BasePage: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  useSetupHistory();
  return <React.Fragment>{children}</React.Fragment>;
};

export default BasePage;
