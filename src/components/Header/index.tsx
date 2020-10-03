/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

export const headerType = {
  Navigation: 'Navigation' as 'Navigation',
  // Normal: 'Normal' as 'Normal',
  None: 'None' as 'None',
};

const getHeader = (type: keyof typeof headerType | undefined) => {
  switch (type) {
    case headerType.Navigation: {
      const Navigation = require('./Navigation').default;
      return <Navigation />;
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

export default function Header(props: HeaderProps): JSX.Element {
  const { type, height } = props;

  const CurrentHeader = React.useMemo(() => {
    return getHeader(type);
  }, [type]);

  console.log(CurrentHeader);

  return (
    <React.Fragment>
      <Self headerHeight={height}>{CurrentHeader}</Self>
    </React.Fragment>
  );
}

const Self = styled.header<{ headerHeight: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(p) => p.headerHeight}px;
`;
