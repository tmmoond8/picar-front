/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';

import Profile from '../Profile';
import { colors } from '../../styles';
import { useCommentContext, observer } from './context';
import { getDateGoodLook } from '../../modules/string';

interface CommentProps {
  id: string;
  authorId: string;
  thumbnail?: string;
  name: string;
  content: string;
  group?: string;
  createAt: string;
  children?: React.ReactNode;
}

const Comment: React.FC<CommentProps> = (props) => {
  const { thumbnail, content, name, group, createAt, children, id } = props;
  const { handleClickReply, about } = useCommentContext();
  const isFocus = React.useMemo(() => (about === id ? 'isFocus' : null), [
    about,
    id,
  ]);
  const isReply = React.useMemo(() => children === undefined, [children]);

  return (
    <StyledComment>
      <ProfilePhoto src={thumbnail} />
      <ContentBox>
        <Profile.Who name={name} group={group} />
        <Content>{content}</Content>
        <span className="date">{getDateGoodLook(createAt)}</span>
        {!isReply && (
          <span
            className={cx('replay-btn', isFocus)}
            onClick={() => handleClickReply(id)}
          >
            답글 달기
          </span>
        )}
        {children}
      </ContentBox>
    </StyledComment>
  );
};

export default observer(Comment);

const StyledComment = styled.li`
  display: flex;
  min-height: 107px;
  padding-top: 14px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
  .isReply {
    .isFocus {
      display: none;
    }
  }
`;

const ProfilePhoto = styled(Profile.Photo)`
  margin-right: 12px;
`;

const ContentBox = styled.div`
  .date {
    font-size: 13px;
    color: ${colors.black99};
    line-height: normal;
  }
  .replay-btn {
    margin-left: 20px;
    font-size: 13px;
    color: ${colors.black66};
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  }
  .isFocus {
    color: ${colors.primary};
  }
`;

const Content = styled.div`
  margin: 5px 0 10px;
  line-height: 20px;
  font-size: 15px;
`;
