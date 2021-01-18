/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Logo from '../Logo';
import Button from '../Button';
import { toast } from 'react-toastify';
import SearchInput from '../Search/SearchInput';
import { useTextField } from '../Input/hooks';
import Profile from '../Profile';
import { colors } from '../../styles';
import Icon from '../Icon';
import { useOpenArticleEditor } from '../Article';

const DesktopHeader: React.FC<{
  
}> = () => {
  const { user } = useStore();
  const [ search, onChangeSearch ] = useTextField('');
  const openArticleEditor = useOpenArticleEditor();

  const handleClickNotification = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    toast.success('지원 준비중 입니다.')
  }, [])

  const handleClickWrite = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);

  return (
    <Header>
      <Logo color={colors.black40}/>
      <Search 
        search={search} 
        onChangeSearch={onChangeSearch} 
        placeholder="찾고싶은 주제 혹은 닉네임을 입력하세요"
      />
      <UserBox>
        <Icon 
          icon="notification" 
          size="24px" 
          color={colors.black99}
          onClick={handleClickNotification}
        />
        {user.isLogined && <ProfilePhoto src={user.profile.thumbnail} size={36}/>}
        {!user.isLogined && <LoginButton onClick={user.needLogin}>로그인</LoginButton>}
        <WriteButton onClick={handleClickWrite} >글쓰기</WriteButton>
      </UserBox>
    </Header>
  );
}

export default observer(DesktopHeader);

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 10px 60px 10px 60px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`

const Search = styled(SearchInput)`
  display: flex;
  align-items: center;
  width: 40%;
  max-width: 360px;
  height: 44px;
  padding: 0;

  .SearchInput {
    height: 44px;
    margin: 0;
    padding: 10px 16px;
    background-color: ${colors.transparent};
    border: solid 1px ${colors.blackBF};
    border-radius: 8px;
  }

  &.focus {
    .SearchInput {
      border: solid 1px ${colors.black22};
    }
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin: 0 24px;
`;

const LoginButton = styled(Button)`
  height: 44px;
  padding: 6px 20px;
  margin-left: 24px;

  span {
    margin: 0;
    font-size: 15px;
  }
`;

const WriteButton = styled(Button)`
  height: 44px;
  padding: 6px 20px;
  margin-left: 8px;
  background-color: ${colors.primary};
  
  span {
    margin: 0;
    font-size: 15px;
    color: ${colors.white};
  }
`;