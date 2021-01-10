/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Page from './BasePage'
import CloseHeader from '../components/Header/CloseHeader';
import MenuBar from '../components/MenuBar';
import NotificationList from '../components/NotificationList';

const NotificationPage: React.FC = () => {
  return (
    <StyledPage>
      <Header onClose={() => console.log('close')} options={{ title: '알림'}}/>
      <NotificationList />
      <StyledMenu />
    </StyledPage>
  )
}
export default NotificationPage;

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Header = styled(CloseHeader)`
  box-shadow: none;
`;

const StyledMenu = styled(MenuBar)`
  position: static;
`;

const Body = styled.div`
  flex: 1;
`;