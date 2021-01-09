/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import MenuItem from './MenuItem';
import Icon from '../Icon';
import { useOpenArticleEditor } from '../Article';

import { observer, useStore } from '../../stores';
import { colors } from '../../styles';

const activeMap = {
  '/': 'Community',
  '/search': 'Search',
  '/notification': 'Notification',
  '/myProfile': 'MyProfile',
} as const;

const MenuBar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useStore();
  const location = useLocation();
  const { pathname } = location;
  const openArticleEditor = useOpenArticleEditor();
  const history = useHistory();

  const moveTo = useCallback(
    (path: string) => {
      if (pathname !== path) {
        history.push(path);
      }
    },
    [history, pathname],
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
  const handleClickMarket = useCallback(() => {
    toast.success('지원 준비중 입니다. 잠시만 기다려주세요~')
    // moveTo('/test')
  }, [moveTo]);
  const handleClickProfile = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    moveTo('/myProfile');
  }, [moveTo, user]);

  return (
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
          className="Write"
          icon={<Icon icon="addRound" size="24px" color={colors.black33} />}
          name="글쓰기"
          onClick={handleClickWrite}
        />
        <MenuItem
          className="Notification"
          icon={<Icon icon="notification" size="24px" color={colors.black33} />}
          name="알림"
          onClick={handleClickMarket}
        />
        <MenuItem
          className="MyProfile"
          icon={<Icon icon="user" size="24px" color={colors.black33} />}
          name="프로필"
          onClick={handleClickProfile}
        />
      </Menus>
    </MenuBarContainer>
  );
};

export default observer(MenuBar);

const MenuBarContainer = styled.div`
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  width: 100%;
  height: 56px;
  background-color: ${colors.white};
  box-shadow: inset 0 0.5px 0 0 #e6e6e6;
`;

const Menus = styled.ul<{ selected: typeof activeMap[keyof typeof activeMap]}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  .MenuBarItem, .icon {
    color: ${colors.black99};
  }
  .MenuBarItem.${p => p.selected} {
    color: ${colors.black33};
    .icon {
      color: ${colors.black33};
    }
  }
`;