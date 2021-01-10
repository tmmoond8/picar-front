/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore, observer } from '../../stores';
import CommentNotification from './CommentNotification';
import EmotionNotification from './EmotionNotification';

const NotificationList: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <List>
      <CommentNotification />
      <EmotionNotification />
    </List>
  );
};

export default observer(NotificationList);

const List = styled.ul`
  overflow-y: scroll;
  flex: 1;
  padding: 4px 0;
`;