/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';
import { colors } from '../../styles';
import { Profile } from '../../types/User';
import { useStore, observer } from '../../stores';
import Icon from '../Icon';
import APIS from '../../apis';
import { useContextMenu } from '../ContextMenu';
import { useAlert } from '../Alert';
import storage from '../../modules/localStorage';
import { useModal } from '../Modal';
import UserList from '../../components/Search/UserList'

const ProfileHeader: React.FC<{ className?: string }> = ({ className }) => {
  const { user, ui, util } = useStore();
  const [count, setCount] = React.useState(0);
  const [admins, setAdmins] = React.useState<Profile[]>([]);
  const { code } = user.profile;
  const contextMenu = useContextMenu();
  const alert = useAlert();
  const modal = useModal();
  const isAdmin = user.profile.email.includes('@owwners.com');

  const handleUnknown = React.useCallback(async () => {
    setCount(count + 1);
    if (count > 20) {
      const { data } = await APIS.auth.deleteUser(code);
      if (data.ok) {
        util.history.goBack();
        setTimeout(() => {
          window.location.reload();
        }, 300)
      }
    }
  }, [count])
  const handleSubmit = React.useCallback(async ({ email, password }) => {
    const { data } = await APIS.auth.owwnerLogin({ email, password });
    if (data.ok) {
      toast(`${email} 계정으로 로그인 되었습니다.`);
      window.location.href = '/';
    }
  }, [])

  React.useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await APIS.auth.getAdmins();
      if (data.ok) {
        setAdmins(data.admins);
      }
    }
    if (isAdmin) {
      fetchAdmins();
    }
  }, [isAdmin]);

  const handleClickMore = React.useCallback((e) => {
    const normalMenus = [
      {
        name: '프로필 수정',
        onClick: () => {
          contextMenu.close();
          util.history.push('/myProfile/edit');
        },
      },
      {
        name: '로그아웃',
        onClick: async () => {
          contextMenu.close();
          alert.open({
            title: '로그아웃 하시겠어요?',
            handleConfirm: async () => {
              alert.close();
              try {
                const { data: { ok } } = await APIS.auth.logout();
                if (ok) {
                  storage.clearToken();
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 300)
                }
              } catch (error) {
                console.error(error);
              }
            },
          })
        },
      },
    ];
    const adminMenus = [{
      name: '계정 전환',
      onClick: () => {
        contextMenu.close();
        modal.open({
          title: '계정 전환',
          contents: (
            <UserList
              users={admins}
              renderRight={(email: string) => (<Icon icon="send" color={colors.primary} size="20px" onClick={() => handleSubmit({ email })} />)}
            />
          )
        })
      }
    }];
    contextMenu.open({
      targetElement: e.target as HTMLElement,
      menus: [...normalMenus, ...(isAdmin ? adminMenus : [])],
    });
  }, [admins])

  return (
    <Header className={cx('ProfileHeader', className)} desktop={ui.queryMatch.Desktop}>
      <Title onClick={handleUnknown}>프로필</Title>
      <Icon icon="more" size="24px" color={colors.black22} onClick={handleClickMore} />
    </Header>
  )
}

export default observer(ProfileHeader);

export const Header = styled.header<{ desktop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  min-height: 60px;
  background-color: ${colors.white};

  .Icon.more {
    position: absolute;
    right: 18px;
    cursor: pointer;
  }

  ${p => p.desktop && css`
    height: 56px;
    min-height: 56px;
    box-shadow: 0 1px 0 0 ${colors.blackF5F6F7};
  `}  
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
  color: ${colors.black22};  
`;