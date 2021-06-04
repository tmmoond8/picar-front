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

const MenuBar: React.FC<{ className?: string }> = ({ className }) => {
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
      return;
    }
    moveTo('/notification')
  }, [moveTo]);
  const handleClickProfile = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    moveTo('/myProfile');
  }, [moveTo, user]);

  const hasNotfi = React.useMemo(() => user.notifications.some(noti => !noti.isViewd), [user.notifications])

  return (
    <React.Fragment>
      <MenuBarContainer className={className}>
        <Menus selected={selectedMenu}>
          <MenuItem
            className="Community"
            icon={<Icon icon="chat" size="24px" color={colors.black33} />}
            name="커뮤니티"
            onClick={handleClickCommunity}
          />
          <MenuItem
            className="Search"
            icon={<Icon icon="search" size="24px" color={colors.black33} />}
            name="검색"
            onClick={handleClickSearch}
          />
          <MenuItem
            className="Notification"
            hasNoti={hasNotfi}
            icon={<Icon icon="notification" size="24px" color={colors.black33} />}
            name="알림"
            onClick={handleClickNotification}
          />
          <MenuItem
            className="News"
            icon={<Icon icon="news" size="24px" color={colors.black33} />}
            name="뉴스"
            onClick={handleClickNews}
          />
          <MenuItem
            className="MyProfile"
            icon={<Icon icon="user" size="24px" color={colors.black33} />}
            name="프로필"
            onClick={handleClickProfile}
          />
        </Menus>
      </MenuBarContainer>
      <FloatingButon onClick={handleClickWrite} />
    </React.Fragment>

  );
};

export default observer(MenuBar);

const MenuBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  background-color: ${colors.white};
  box-shadow: inset 0 0.5px 0 0 #e6e6e6;
  z-index: 2200;
`;

const Menus = styled.ul<{ selected: typeof activeMap[keyof typeof activeMap] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  .MenuBarItem, .Icon {
    color: ${colors.black99};
    cursor: pointer;
  }
  .MenuBarItem.${p => p.selected} {
    color: ${colors.black33};
    .Icon {
      color: ${colors.black33};
    }
  }
`;
