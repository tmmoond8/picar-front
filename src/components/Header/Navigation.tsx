/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';

import { colors } from '../../styles';

import { navigations } from '../../types/constants';

export default observer(function Navigation(): JSX.Element {
  const { article } = useStore();

  const handleSetGroup = React.useCallback(
    (selected: string) => {
      article.selectedGroup = selected;
    },
    [article],
  );

  return (
    <Self>
      <List>
        {navigations.map((item) => (
          <Item
            selected={item.name === article.selectedGroup}
            key={item.name}
            onClick={() => {
              handleSetGroup(item.name);
            }}
          >
            {item.name}
          </Item>
        ))}
      </List>
    </Self>
  );
});

const Self = styled.nav`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  box-shadow: inset 0 -0.5px 0 0 rgba(0, 0, 0, 0.6);
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  height: 29px;
  padding: 0 20px;
  li + li {
    margin-left: 18px;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(p) => (p.selected ? colors.primary : colors.blackBF)};
  cursor: pointer;
`;
