/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

export const headerType = {
  Navigation: 'Navigation' as 'Navigation',
  Back: 'Back' as 'Back',
  Close: 'Close' as 'Close',
  None: 'None' as 'None',
};

const getHeader = (type: keyof typeof headerType | undefined) => {
  switch (type) {
    case headerType.Navigation: {
      const Navigation = require('./Navigation').default;
      return <Navigation />;
    }
    case headerType.Back: {
      const Back = require('./Back').default;
      return <Back />;
    }
    case headerType.Close: {
      const Close = require('./Close').default;
      return <Close />;
    }
    default: {
      return <React.Fragment />;
    }
  }
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

export default React.memo(function Header(props: HeaderProps): JSX.Element {
  const { type, height } = props;

  const CurrentHeader = React.useMemo(() => {
    return getHeader(type);
  }, [type]);

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
`;
