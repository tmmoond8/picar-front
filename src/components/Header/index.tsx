/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';

export const headerType = {
  Navigation: 'Navigation' as 'Navigation',
  Back: 'Back' as 'Back',
  Close: 'Close' as 'Close',
  None: 'None' as 'None',
};

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
    case headerType.Navigation: {
      const NavigationHeader = require('./NavigationHeader').default;
      return <NavigationHeader height={height} options={options} />;
    }
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

export default (function Header(props: HeaderProps): JSX.Element {
  const { type, height } = props;
  const {
    ui: { header },
  } = useStore();

  const CurrentHeader = React.useMemo(() => {
    return getHeader(type, header);
  }, [type, header]);

  return (
    <React.Fragment>
      <Self headerHeight={height}>{CurrentHeader}</Self>
    </React.Fragment>
  );
});

const Self = styled.header<{ headerHeight: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(p) => p.headerHeight}px;
  z-index: 100;
`;
