/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';
import BottomSheet from '../BottomSheet';
import LoginBox from '../Login/LoginBox';
import Icon from '../Icon';
import Editor from '../Editor';

import { observer, user, useStore } from '../../stores';
import { colors } from '../../styles';
import Article from '../../types/Article';
import { Profile } from '../../types/User';

export default observer(function MenuBar(): JSX.Element {
  const {
    article,
    user: { profile },
  } = useStore();
  const location = useLocation();
  const { pathname } = location;
  const bottomSheet = BottomSheet.useBottomSheet();
  const history = useHistory();

  const moveTo = useCallback(
    (path: string) => {
      if (pathname !== path) {
        history.push(path);
      }
    },
    [history, pathname],
  );

  const handleSetUserProfile = (profile: Profile) => (user.profile = profile);
  const handleClickCommunity = useCallback(() => moveTo('/'), [moveTo]);
  const handleClickSearch = useCallback(() => moveTo('/search'), [moveTo]);
  const handleClickWrite = useCallback(() => {
    const appendArticle = (newArticle: Article) => {
      article.articles = [newArticle, ...article.articles];
    };
    bottomSheet.open({
      title: ' 글 쓰기',
      headerType: 'close',
      isFull: true,
      contents: (
        <Editor appendArticle={appendArticle} onClose={bottomSheet.close} />
      ),
    });
  }, [article.articles, bottomSheet]);
  const handleClickMarket = useCallback(() => moveTo('/test'), [moveTo]);
  const handleClickProfile = useCallback(() => {
    if (profile.code !== 'test') {
      moveTo('/profile');
    } else {
      bottomSheet.open({
        title: '',
        contents: (
          <LoginBox
            onClose={bottomSheet.close}
            onSetUserProfile={handleSetUserProfile}
          />
        ),
      });
    }
  }, [bottomSheet, moveTo, profile]);

  return (
    <MenuBarContainer>
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
});

const MenuBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
  }
`;
