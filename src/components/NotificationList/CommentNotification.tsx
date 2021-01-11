/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';
import Profile from '../Profile';
import Icon from '../Icon';
import { Notification } from '../../types/Notification';

const CommentNotification: React.FC<Notification & { className?: string}> = ({ 
  className,
  targetContent,
  user,
  createAt,
}) => {
  return (
    <NotificationItem>
      <Profile.Photo src={user.profileImage} size={48}/>
      <Contents>
        <Title>{`${user.name}  님이 댓글을 남겼습니다.`}</Title>
        <ArticleTitle>
          <Icon icon="articleNew" size="16px"/>
          {targetContent}
        </ArticleTitle>
        <Date>{getDateGoodLook(createAt)}</Date>
      </Contents>
    </NotificationItem>
  );
};

export default CommentNotification;

const NotificationItem = styled.li`
  display: flex;
  padding: 10px 18px 12px 18px;
  .UserProfilePhoto {
    margin: 0 12px 0 0;
  }
`;

const Contents = styled.div``;

const Title = styled.h3`
  font-size: 15px;
  line-height: 1.33;
  color: ${colors.black22};
  font-weight: 500;
`;

const ArticleTitle = styled.h4`
  display: flex;
  margin: 6px 0 0 0;
  font-size: 13px;
  line-height: 1.23;
  color: ${colors.black99};

  .icon.articleNew {
    margin: 0 5px 0 0;
  }
`;

const Date = styled.p`
  margin: 6px 0 0 0;
  font-size: 13px;
  color: ${colors.black77};
`;