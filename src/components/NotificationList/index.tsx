/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Notification } from '../../types/Notification';
import CommentNotification from './CommentNotification';
import EmotionNotification from './EmotionNotification';

const NotificationList: React.FC<{ className?: string; notifications: Notification[]
 }> = ({ className, notifications }) => {
   
  return (
    <List className={className}>
      {notifications.map((notification) => (
        <React.Fragment>
          {notification.target === 'comment' && <CommentNotification {...notification}/>}
          {notification.target === 'emotion' && <EmotionNotification {...notification}/>}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;

const List = styled.ul`
  overflow-y: scroll;
  flex: 1;
  padding: 4px 0;
`;