/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer, util } from '../../stores';
import Logo from '../Logo';
import Button from '../Button';
import { toast } from 'react-toastify';
import SearchInput from '../Search/SearchInput';
import { useTextField } from '../Input/hooks';
import Profile from '../Profile';
import { useContextMenu, getElementPosition } from '../ContextMenu';
import { colors } from '../../styles';
import APIS from '../../apis';
import Icon from '../Icon';
import { useOpenArticleEditor } from '../Article';

const DesktopHeader: React.FC<{
  
}> = () => {
  const { user, util } = useStore();
  const [ search, onChangeSearch ] = useTextField('');
  const openArticleEditor = useOpenArticleEditor();

  const handleClickNotification = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    toast.success('지원 준비중 입니다.')
  }, [])
  const handleClickProfile = useProfile();
  
  const handleClickLogo = React.useCallback(() => {
    util.history.push('/');
  }, [])

  const handleClickWrite = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    openArticleEditor();
  }, [openArticleEditor, user]);

  return (
    <Header>
      <Container>
        <Logo color={colors.black40} onClick={handleClickLogo}/>
          <Search 
            search={search} 
            onChangeSearch={onChangeSearch} 
            placeholder="찾고싶은 주제 혹은 닉네임을 입력하세요"
          />
          <UserBox >
            <Notification onClick={handleClickNotification}>
              <Icon 
                icon="notification" 
                size="24px" 
                color={colors.black33}
              />
            </Notification>
            
            {user.isLogined && (
              <ProfilePhoto onClick={handleClickProfile}>
                <Profile.Photo src={user.profile.profileImage} size={36}/>
              </ProfilePhoto>
            )}
            
            {!user.isLogined && <LoginButton onClick={user.needLogin}>로그인</LoginButton>}
            <WriteButton onClick={handleClickWrite} >글쓰기</WriteButton>
          </UserBox>
      </Container>
    </Header>
  );
}

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
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
`;

const Search = styled(SearchInput)`
  display: flex;
  align-items: center;
  flex: 1;
  height: 44px;
  margin: 0 20px 0 24px;
  padding: 0;

  .SearchInput {
    height: 44px;
    margin: 0;
    padding: 10px 16px;
    background-color: ${colors.transparent};
    border: solid 1px ${colors.blackBF};
    border-radius: 22px;
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

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${colors.blackF5F6F7};
  border-radius: 24px;
  cursor: pointer;
  .Icon.notification {
    cursor: pointer;
  }
`;

const ProfilePhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 20px 0 12px;
  background-color: ${colors.blackF5F6F7};
  border-radius: 24px;
  cursor: pointer;
  .UserProfilePhoto {
    cursor: pointer;
  }
`;

const LoginButton = styled(Button)`
  height: 44px;
  padding: 6px 20px;
  margin: 0 12px 0 20px;

  span {
    margin: 0;
    font-size: 15px;
  }
`;

const WriteButton = styled(Button)`
  height: 44px;
  padding: 6px 20px;
  background-color: ${colors.primary};
  
  span {
    margin: 0;
    font-size: 15px;
    color: ${colors.white};
  }
`;

function useProfile() {
  const { user, util } = useStore();
  const contextMenu = useContextMenu();

  const handleClickProfile = React.useCallback(
    (e: React.MouseEvent) => {
      if (!user.isLogined) {
        return;
      }
      const positions = getElementPosition(e.target as HTMLElement);
      contextMenu.open({
        ...positions,
        menus: [
          {
            name: '내 프로필',
            onClick: () => {
              contextMenu.close();
              util.history.push('/myProfile');
            },
          },
          {
            name: '공지사항',
            onClick: () => {
              window.open('https://www.notion.so/taem/d7e6d7a18ec849b3b543e7389b0bd5fe', '_blank')
              contextMenu.close();
            },
          },
          {
            name: '자주 묻는 질문',
            onClick: () => {
              window.open('https://www.notion.so/taem/2fbdb025be1c45748504f74d33eda2d3', '_blank')
              contextMenu.close();
            },
          },
          {
            name: '로그아웃',
            onClick: async () => {
              contextMenu.close();
              try {
                const { data: { ok } } = await APIS.auth.logout();
                if (ok) {
                  window.location.reload(false);
                }
              } catch(error) {
                console.error(error);
              }
            },
          },
        ],
      });
    },
    [contextMenu],
  );
  return handleClickProfile;
}