/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import { NAVIGATIONS, LOUNGES, LOUNGE } from '../../types/constants';

const TabletNavigation: React.FC = () => {
  const { article } = useStore();
  const handleClickTopMenu = React.useCallback((group: string) => {
    article.selectedGroup = group;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickBottomMenu = React.useCallback((lounge: string) => {
    article.selectedLounge = lounge;
    article.selectedGroup = LOUNGE;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navigation className={cx('TabletNavigation')}>
      <Top>
        {NAVIGATIONS.map((name) => (
          <TopMenu
            key={name}
            selected={article.selectedGroup === name}
            onClick={() => handleClickTopMenu(name)}
          >
            {name}
          </TopMenu>
        ))}
      </Top>
      {article.selectedGroup === LOUNGE && (
        <Bottom>
          <SubMenus>
            {LOUNGES.map(({ name }) => (
              <BottomMenu
                key={name}
                selected={article.selectedLounge === name}
                onClick={() => handleClickBottomMenu(name)}
              >
                {name}
              </BottomMenu>
            ))}
          </SubMenus>
        </Bottom>
      )}
    </Navigation>
  );
};

export default observer(TabletNavigation);

const Navigation = styled.nav`
  background-color: ${colors.white};
`;
const Top = styled.ul`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  cursor: pointer;
  box-shadow: inset 0 -1px ${colors.blackF5F6F7};
`;
const TopMenu = styled.li<{ selected: boolean }>`
  margin-right: 20px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.28px;
  color: ${colors.blackAA};
  ${(p) =>
    p.selected &&
    css`
      color: ${colors.black22};
      border-bottom: 2px solid ${colors.black22};
    `}
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  overflow-x: auto;
  border-bottom: 1px solid ${colors.blackEB};
`;
const SubMenus = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: -1px;
  min-width: 600px;
  padding: 0 20px;
`;
const BottomMenu = styled.li<{ selected: boolean }>`
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.28px;
  color: ${colors.blackAA};
  border-radius: 19px;
  cursor: pointer;

  &:hover {
    color: ${colors.blackAA};
    background-color: ${colors.blackEB};
    box-shadow: inset 0 0 0 20px ${colors.blackF5F6F7},
      0 0 0 8px ${colors.blackF5F6F7};
  }

  ${(p) =>
    p.selected &&
    css`
      color: ${colors.black22};
      &:hover {
        color: ${colors.black22};
      }
    `}
`;
