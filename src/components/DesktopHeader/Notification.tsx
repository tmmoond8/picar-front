/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';
import { useStore, observer } from '../../stores';
import Icon from '../Icon';
import { colors } from '../../styles';

const Notification = () => {
  const { user } = useStore();
  const handleClickNotification = React.useCallback(() => {
    if (user.needLogin()) {
      return;
    }
    toast.success('지원 준비중 입니다.')
  }, [])
  
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
  background-color: ${colors.blackF5F6F7};
  border-radius: 24px;
  cursor: pointer;
  .Icon.notification {
    cursor: pointer;
  }
`;
