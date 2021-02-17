/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';
import { useStore, observer } from '../../stores';
import Icon from '../Icon';
import APIS from '../../apis';
import { useContextMenu, getElementPosition } from '../ContextMenu';

const ProfileHeader: React.FC<{ className?: string}> = ({ className}) => {
  const { user, util, ui } = useStore();
  const [ count, setCount ] = React.useState(0);
  const { code } = user.profile;
  const contextMenu = useContextMenu();

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

  const handleClickMore = React.useCallback((e) => {
    const positions = getElementPosition(e.target as HTMLElement);
    contextMenu.open({
      ...positions,
      menus: [
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
  }, [])

  return (
    <Header className={cx('ProfileHeader', className)}>
      <Title onClick={handleUnknown}>프로필</Title>
      <Icon icon="more" size="24px" color={colors.black22} onClick={handleClickMore}/>
    </Header>
  )
}

export default observer(ProfileHeader);

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  background-color: ${colors.white};

  .Icon.more {
    position: absolute;
    right: 18px;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
  color: ${colors.black22};  
`;