/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import cx from 'classnames';
import { useSetupHistory } from '../hooks';

const BasePage: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className }) => {
  useSetupHistory();
  return <Page className={cx(className, 'BasePage')}>{children}</Page>;
};

export default BasePage;

const Page = styled.div`
  height: 100%;
`;
