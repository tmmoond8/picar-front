/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../styles';
import LoungeSelector from './LoungeSelector';
import MyActivity from './MyActivity';
import MenuBar from '../MenuBar';

const GAP = 24;

const Tablet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TableLayout>
      <StyledMenuBar />
      <Body>
        <Left>
          <FixedBox>
            <LoungeSelector />
            <MyActivity />
          </FixedBox>
        </Left>
        {children}
      </Body>
    </TableLayout>
  );
};

export default {
  Tablet,
};

const TableLayout = styled.div`
  margin: 0 auto;
  padding: ${60 + GAP}px ${GAP}px ${GAP}px ${GAP}px;
  background-color: ${colors.blackF5F6F7};
`;

const Left = styled.aside`
  left: ${GAP}px;
  width: 300px;
  height: 600px;
  margin: 0 ${GAP}px 0 0;

  .LoungeSelector {
  }

  .MyActivity {
    bottom: 0;
    margin: 12px 0 0 0;
  }
`;

const StyledMenuBar = styled(MenuBar)`
  top: 0;
  height: 60px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ul {
    width: 332px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  .ArticleList {
    flex: 1;
    min-width: 320px;
    max-width: 540px;
  }
`;

const FixedBox = styled.div`
  position: fixed;
`;
