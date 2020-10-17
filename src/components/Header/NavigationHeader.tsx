/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';
import BottomSheet from '../BottomSheet';
import Icon from '../Icon';

import { colors } from '../../styles';

import { NAVIGATIONS, ROUNGE } from '../../types/constants';
import RoungeGrid from '../RoungeGrid';

const NavigationHeader = (): JSX.Element => {
  const {
    article,
    ui: { header },
  } = useStore();

  const bottomSheet = BottomSheet.useBottomSheet();
  const handleOpenBottomSheet = React.useCallback(() => {
    bottomSheet.open({
      title: '업종 라운지를 선택해 주세요',
      contents: (
        <RoungeGrid
          onClick={(group: string) => {
            article.selectedRounge = group;
            article.selectedGroup = ROUNGE;
            bottomSheet.close();
          }}
        />
      ),
    });
  }, [article.selectedGroup, article.selectedRounge, bottomSheet]);

  const handleSetGroup = React.useCallback(
    (selected: string) => {
      article.selectedGroup = selected;
      const moveIndex = Math.max(
        NAVIGATIONS.findIndex(({ name }) => name === selected),
        0,
      );
      article.flickingMoveTo(moveIndex);
    },
    [article],
  );

  return (
    <Self >
      <List>
        {NAVIGATIONS.map((item) => (
          <React.Fragment>
            {item.name === ROUNGE ? (
              <RougeSelector
                selected={article.selectedGroup === ROUNGE}
                key={ROUNGE}
                onClick={() => {
                  if (article.selectedGroup === ROUNGE) {
                    handleOpenBottomSheet();
                  } else {
                    handleSetGroup(item.name);
                  }
                }}
              >
                {article.selectedRounge}
                <Icon icon="dropdown" size="16px" />
              </RougeSelector>
            ) : (
              <Item
                selected={item.name === article.selectedGroup}
                key={item.name}
                onClick={() => {
                  handleSetGroup(item.name);
                }}
              >
                {item.name}
              </Item>
            )}
          </React.Fragment>
        ))}
      </List>
    </Self>
  );
}

NavigationHeader.type = 'Navition';

export default observer(NavigationHeader);

const HEIGHT = 56;

const Self = styled.nav`
  display: flex;
  align-items: center;
  height: ${HEIGHT}px;
  width: 100%;
  background: ${colors.white};
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

const RougeSelector = styled(Item)`
  display: flex;
  svg {
    margin-left: 4px;
  }
`;
