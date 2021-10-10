/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Page from './BasePage';
import CloseHeader from '../components/Header/CloseHeader';
import MenuBar from '../components/MenuBar';
import NotificationList from '../components/NotificationList';
import { useStore, observer } from '../stores';

const NotificationPage: React.FC = () => {
  const { user } = useStore();
  return (
    <StyledPage>
      <Header
        onClose={() => console.log('close')}
        options={{ title: '알림' }}
      />
      <NotificationList notifications={user.notifications} />
      <MenuBar />
    </StyledPage>
  );
};
export default observer(NotificationPage);

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Header = styled(CloseHeader)`
  box-shadow: none;
  .Icon.close {
    display: none;
  }
`;
