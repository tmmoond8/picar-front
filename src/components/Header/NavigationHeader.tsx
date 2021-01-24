/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';
import { useModal } from '../Modal';
import Icon from '../Icon';

import { colors } from '../../styles';
import { CAROUSEL } from '../../types/constants';

import { NAVIGATIONS, LOUNGE } from '../../types/constants';
import LoungeGrid from '../LoungeGrid';

const NavigationHeader = () => {
  const { article } = useStore();
  const modal = useModal();
  const handleOpenBottomSheet = React.useCallback(() => {
    modal.open({
      title: '업종 라운지를 선택해 주세요',
      contents: (
        <LoungeGrid
          selectedLounge={article.selectedLounge}
          onClick={(group: string) => {
            article.selectedLounge = group;
            article.selectedGroup = LOUNGE;
            setTimeout(() => {
              modal.close();
            }, 300);
          }}
        />
      ),
    });
  }, [article.selectedGroup, article.selectedLounge, modal]);

  const handleSetGroup = React.useCallback(
    (selected: string) => {
      article.selectedGroup = selected;
      const moveIndex = Math.max(
        NAVIGATIONS.findIndex(({ name }) => name === selected),
        0,
      );
      (window as any).__OWNER__[CAROUSEL.HOME](moveIndex);
    },
    [article],
  );

  const delayCondition = React.useRef(Date.now());
  const isFreezed = () => Date.now() - delayCondition.current < 500;

  return (
    <Self>
      <List>
        {NAVIGATIONS.map((item) => (
          <React.Fragment key={item.name}>
            {item.name === LOUNGE ? (
              <LougeSelector
                selected={article.selectedGroup === LOUNGE}
                key={LOUNGE}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
                  if (article.selectedGroup === LOUNGE) {
                    handleOpenBottomSheet();
                  } else {
                    handleSetGroup(item.name);
                  }
                }}
              >
                {article.selectedLounge}
                <Icon icon="dropdown" size="16px" />
              </LougeSelector>
            ) : (
              <Item
                selected={item.name === article.selectedGroup}
                key={item.name}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
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
};

NavigationHeader.type = 'Navition';

export default observer(NavigationHeader);

const HEIGHT = 56;

const Self = styled.nav`
  display: flex;
  align-items: center;
  height: ${HEIGHT}px;
  width: 100%;
  background: ${colors.white};
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
  color: ${(p) => (p.selected ? colors.black33 : colors.blackBF)};
  cursor: pointer;
`;

const LougeSelector = styled(Item)<{ selected: boolean }>`
  display: flex;
  svg {
    color: ${(p) => (p.selected ? colors.primary : colors.blackBF)};
    margin-left: 4px;
  }
`;
