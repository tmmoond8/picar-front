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
        NAVIGATIONS.findIndex((name) => name === selected),
        0,
      );
      (window as any).__OWNER__[CAROUSEL.HOME](moveIndex);
    },
    [article],
  );

  const delayCondition = React.useRef(Date.now());
  const isFreezed = () => Date.now() - delayCondition.current < 500;

  return (
    <Header>
      <List>
        {NAVIGATIONS.map((name) => (
          <React.Fragment key={name}>
            {name === LOUNGE ? (
              <LougeSelector
                selected={article.selectedGroup === LOUNGE}
                key={LOUNGE}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
                  if (article.selectedGroup === LOUNGE) {
                    handleOpenBottomSheet();
                  } else {
                    handleSetGroup(name);
                  }
                }}
              >
                {article.selectedLounge}
                <Icon icon="dropdown" size="16px" />
              </LougeSelector>
            ) : (
              <Item
                selected={name === article.selectedGroup}
                key={name}
                onClick={() => {
                  if (isFreezed()) return;
                  delayCondition.current = Date.now();
                  handleSetGroup(name);
                }}
              >
                {name}
              </Item>
            )}
          </React.Fragment>
        ))}
      </List>
    </Header>
  );
};

NavigationHeader.type = 'Navition';

export default observer(NavigationHeader);

const HEIGHT = 56;

const Header = styled.nav`
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
  overflow-x: scroll;
  li + li {
    margin-left: 12px;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(p) => (p.selected ? colors.black33 : colors.blackBF)};
  word-break: keep-all;
  cursor: pointer;
`;

const LougeSelector = styled(Item)<{ selected: boolean }>`
  display: flex;
  svg {
    color: ${(p) => (p.selected ? colors.primary : colors.blackBF)};
    margin-left: 4px;
  }
`;
