import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import cx from 'classnames';

export default function Center({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <CenterContainer className={cx('CenterContainer', className)}>
      {children}
    </CenterContainer>
  );
};

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;