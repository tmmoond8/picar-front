/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';
import FloatingButon from './FloatingButton';
import Icon from '../Icon';
import { useOpenArticleEditor } from '../Article';

import { observer, useStore } from '../../stores';
import { colors } from '../../styles';

const activeMap = {
  '/': 'Community',
  '/search': 'Search',
  '/notification': 'Notification',
  '/news': 'News',
  '/myProfile': 'MyProfile',
} as const;

const MenuBar: React.FC<{ className?: string; floatingButton?: boolean }> = ({
  className,
  floatingButton = false,
}) => {
  const { user, util } = useStore();
  const location = useLocation();
  const { pathname } = location;
  const openArticleEditor = useOpenArticleEditor();

  const moveTo = useCallback(
    (path: string) => {
      if (pathname !== path) {
        util.history.replace(path);
      }
    },
    [util.history, pathname],
  );
  const selectedMenu = React.useMemo(() => {
    return activeMap[pathname as keyof typeof activeMap] ?? '/';
  }, [pathname]);

  const handleClickCommunity = useCallback(() => moveTo('/'), [moveTo]);
  const handleClickSearch = useCallback(() => moveTo('/search'), [moveTo]);
  const handleClickWrite = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);
  const handleClickNews = useCallback(() => moveTo('/news'), [moveTo]);
  const handleClickNotification = useCallback(() => {
    if (user.needLogin()) {
      console.log('need');
      return;
    }
    moveTo('/notification');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveTo]);
  const handleClickProfile = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    moveTo('/myProfile');
  }, [moveTo, user]);

  const hasNotfi = React.useMemo(
    () => user.notifications.some((noti) => !noti.isViewd),
    [user.notifications],
  );

  return (
    <React.Fragment>
      <MenuBarContainer className={className}>
        <Menus selected={selectedMenu}>
          <MenuItem
            className="Community"
            icon={<Icon icon="chat" size="24px" color={colors.black33} />}
            name="????????????"
            onClick={handleClickCommunity}
          />
          <MenuItem
            className="Search"
            icon={<Icon icon="search" size="24px" color={colors.black33} />}
            name="??????"
            onClick={handleClickSearch}
          />
          <MenuItem
            className="Notification"
            hasNoti={hasNotfi}
            icon={
              <Icon icon="notification" size="24px" color={colors.black33} />
            }
            name="??????"
            onClick={handleClickNotification}
          />
          <MenuItem
            className="News"
            icon={<Icon icon="news" size="24px" color={colors.black33} />}
            name="??????"
            onClick={handleClickNews}
          />
          <MenuItem
            className="MyProfile"
            icon={<Icon icon="user" size="24px" color={colors.black33} />}
            name="?????????"
            onClick={handleClickProfile}
          />
        </Menus>
      </MenuBarContainer>
      {floatingButton && <FloatingButon onClick={handleClickWrite} />}
    </React.Fragment>
  );
};

export default observer(MenuBar);

const MenuBarContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 60px;
  background-color: ${colors.white};
  box-shadow: inset 0 1px 0 0 ${colors.blackEB};
  z-index: 2200;
`;

const Menus = styled.ul<{ selected: typeof activeMap[keyof typeof activeMap] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  margin: 0 auto;
  .MenuBarItem,
  .Icon {
    color: ${colors.black99};
    cursor: pointer;
  }
  .MenuBarItem.${(p) => p.selected} {
    color: ${colors.black33};
    .Icon {
      color: ${colors.black33};
    }
  }
`;
