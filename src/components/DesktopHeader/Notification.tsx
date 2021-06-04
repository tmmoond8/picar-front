/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useStore, observer } from '../../stores';
import Icon from '../Icon';
import { useContextMenu } from '../ContextMenu';
import { colors } from '../../styles';
import NotificationList from '../NotificationList';

const Notification = () => {
  const handleClickNotification = useNotification();

  return (
    <StyledNotification onClick={handleClickNotification}>
      <Icon
        icon="notification"
        size="24px"
        color={colors.black33}
      />
    </StyledNotification>
  )
}

export default observer(Notification);

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  cursor: pointer;
  .Icon.notification {
    cursor: pointer;
  }
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${colors.blackF5F6F7};
  }
`;

function useNotification() {
  const { user } = useStore();
  const contextMenu = useContextMenu();

  return React.useCallback(
    (e: React.MouseEvent) => {
      if (!user.isLogined) {
        return;
      }
      contextMenu.open({
        targetElement: e.target as HTMLElement,
        alignX: 'right',
        contents: <NotificationList onClick={contextMenu.close} notifications={user.notifications} />
      });
    },
    [contextMenu],
  );
}