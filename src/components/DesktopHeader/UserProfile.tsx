/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Profile from '../Profile';
import { useContextMenu, getElementPosition } from '../ContextMenu';
import APIS from '../../apis';
import { colors } from '../../styles';
import Button from '../Button';

const UserProfile = () => {
  const { user } = useStore();
  const handleClickProfile = useProfile();

  return (
    <React.Fragment>
      {user.isLogined && (
        <ProfilePhoto onClick={handleClickProfile}>
          <Profile.Photo src={user.profile.profileImage} size={36}/>
        </ProfilePhoto>
      )}
      {!user.isLogined && <LoginButton onClick={user.needLogin}>로그인</LoginButton>}
    </React.Fragment>
  )
}

export default observer(UserProfile);

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
            underline: true,
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
            underline: true,
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