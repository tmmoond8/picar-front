/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Notification } from '../../types/Notification';
import CommentNotification from './CommentNotification';
import EmotionNotification from './EmotionNotification';

const NotificationList: React.FC<{
  className?: string;
  notifications: Notification[];
  onClick?: () => void;
}> = ({ className, notifications, onClick = () => {} }) => {
  return (
    <List className={className} onClick={onClick}>
      {notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          {notification.type === 'comment' && (
            <CommentNotification {...notification} />
          )}
          {notification.type === 'emotion' && (
            <EmotionNotification {...notification} />
          )}
          {notification.type === 'reply' && (
            <CommentNotification {...notification} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;

const List = styled.ul`
  overflow-y: auto;
  flex: 1;
  padding: 8px 0;
`;
