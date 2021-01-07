/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { colors } from '../../styles';

export const Tabs: React.FC<{ children: React.ReactNode; className?: string; }> = ({children, className}) => {
  return (
    <StyledTabs className={cx('Tabs', className)}>
      {children}
    </StyledTabs>
  )
}

export const TabItem: React.FC<{ 
  children: React.ReactNode,
  handleClick: () => void,
  className?: string;
  selected: boolean;
}> = ({className, children, selected, handleClick}) => {
  return (
    <StyledTabItem className={cx('TabItem', className)} selected={selected} onClick={handleClick}>
      {children}
    </StyledTabItem>
  )
}

const StyledTabs = styled.ol`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 18px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
  .tab + .tab {
    margin: 0 0 0 18px;
  }
`;

const StyledTabItem = styled.li<{selected: boolean}>`
  flex: 1;
  line-height: 44px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: ${p => p.selected ? colors.black33 : colors.blackBF};

  cursor: pointer;
  ${p => p.selected && css`
    box-shadow: inset 0 -1px 0 0 ${colors.black33};
  `}
`;