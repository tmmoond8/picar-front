/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { useStore, observer } from '../../stores';
import Logo from '../Logo';
import Button from '../Button';
import { colors } from '../../styles';
import { useOpenArticleEditor } from '../Article';
import Search from './Search';
import UserProfile from './UserProfile';
import Notification from './Notification';

const DesktopHeader: React.FC = () => {
  const { user, util } = useStore();
  const openArticleEditor = useOpenArticleEditor();

  const handleClickLogo = React.useCallback(() => {
    util.history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickWrite = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);

  return (
    <Header className={cx('DesktopHeader')}>
      <Container>
        <Logo color={colors.black40} onClick={handleClickLogo} />
        <Search />
        <UserBox className={cx('UserBox')}>
          <Notification />
          <UserProfile />
          <WriteButton onClick={handleClickWrite}>글쓰기</WriteButton>
        </UserBox>
      </Container>
    </Header>
  );
};

export default observer(DesktopHeader);

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 0 36px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
  z-index: 10000;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 952px;
  margin: 0 auto;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const WriteButton = styled(Button)`
  height: 44px;
  padding: 6px 20px;
  background-color: ${colors.primary3};

  span {
    margin: 0;
    font-size: 15px;
    color: ${colors.black22};
  }
`;
