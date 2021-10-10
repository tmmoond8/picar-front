/* eslint-disable @typescript-eslint/no-var-requires */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { useStore } from '../../stores';

export const headerType = {
  Navigation: 'Navigation',
  Back: 'Back',
  Close: 'Close',
  None: 'None',
} as const;

export interface HeaderProps {
  type: keyof typeof headerType;
  height: number;
  options?: Record<string, any>;
}

export const initalHeader: HeaderProps = {
  type: headerType.None,
  height: 0,
};

const getHeader = (
  type: keyof typeof headerType | undefined,
  header: HeaderProps,
) => {
  const { height, options } = header;
  switch (type) {
    case headerType.Back: {
      const BackHeader = require('./BackHeader').default;
      return <BackHeader height={height} options={options} />;
    }
    case headerType.Close: {
      const CloseHeader = require('./CloseHeader').default;
      return <CloseHeader height={height} options={options} />;
    }
    default: {
      return <React.Fragment />;
    }
  }
};

const Header: React.FC<HeaderProps> = ({ type }) => {
  const {
    ui: { header },
  } = useStore();

  const CurrentHeader = React.useMemo(() => {
    return getHeader(type, header);
  }, [type, header]);

  return <React.Fragment>{CurrentHeader}</React.Fragment>;
};

export default Header;
