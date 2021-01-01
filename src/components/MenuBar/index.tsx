/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';
import Icon from '../Icon';
import { useOpenArticleEditor } from '../Article';

import { observer, useStore } from '../../stores';
import { colors } from '../../styles';

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

  const handleClickCommunity = useCallback(() => moveTo('/'), [moveTo]);
  const handleClickSearch = useCallback(() => moveTo('/search'), [moveTo]);
  const handleClickWrite = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);
  const handleClickMarket = useCallback(() => moveTo('/test'), [moveTo]);
  const handleClickProfile = useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    moveTo('/profile');
  }, [moveTo, user]);

  return (
    <MenuBarContainer className={className}>
      <ul>
        <MenuItem
          icon={<Icon icon="chat" size="24px" color={colors.black33} />}
          name="커뮤니티"
          onClick={handleClickCommunity}
        />
        <MenuItem
          icon={<Icon icon="search" size="24px" color={colors.black33} />}
          name="검색"
          onClick={handleClickSearch}
        />
        <MenuItem
          icon={<Icon icon="edit" size="24px" color={colors.black33} />}
          name="글쓰기"
          onClick={handleClickWrite}
        />
        <MenuItem
          icon={<Icon icon="package" size="24px" color={colors.black33} />}
          name="장터"
          onClick={handleClickMarket}
        />
        <MenuItem
          icon={<Icon icon="user" size="24px" color={colors.black33} />}
          name="프로필"
          onClick={handleClickProfile}
        />
      </ul>
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
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
  }
`;
