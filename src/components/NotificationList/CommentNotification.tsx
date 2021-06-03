/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import APIS from '../../apis';
import { useStore, observer } from '../../stores';
import { getDateGoodLook } from '../../modules/string';
import { colors } from '../../styles';
import Profile from '../Profile';
import Icon from '../Icon';
import { Notification } from '../../types/Notification';

const CommentNotification: React.FC<Notification & { className?: string }> = ({
  className,
  targetContent,
  user,
  createAt,
  isViewd,
  id,
  articleId,
  type,
}) => {
  const { user: userStore, util } = useStore();
  const history = util.useHistory();
  const handleCheckView = React.useCallback(async () => {
    if (!isViewd) {
      try {
        await APIS.notification.checkView(id);
        userStore.checkNotifications([id]);

      } catch (error) {
        console.error(error);
      }
    }
    setTimeout(() => {
      history.push(`/article/${articleId}`);
    }, 50);
  }, [history]);

  return (
    <NotificationItem isViewd={isViewd} className={className} onClick={handleCheckView}>
      <Profile.Photo src={user.profileImage} size={48} />
      <Contents>
        <Title>{`${user.name}  님이 ${type === 'comment' ? '댓글' : '답글'}을 남겼습니다.`}</Title>
        <ArticleTitle>
          <Icon icon="articleNew" size="16px" />
          {targetContent}
        </ArticleTitle>
        <Date>{getDateGoodLook(createAt)}</Date>
      </Contents>
    </NotificationItem>
  );
};

export default observer(CommentNotification);

const NotificationItem = styled.li<{ isViewd: boolean }>`
  display: flex;
  padding: 10px 18px 12px 18px;
  background-color: ${p => p.isViewd ? colors.transparent : colors.primaryE};
  cursor: pointer;
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

  .Icon.articleNew {
    margin: 0 5px 0 0;
  }
`;

const Date = styled.p`
  margin: 6px 0 0 0;
  font-size: 13px;
  color: ${colors.black77};
`;