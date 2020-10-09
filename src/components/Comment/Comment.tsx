/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
import { colors } from '../../styles';

interface CommentProps {
  authorId: string;
  thumbnail?: string;
  name: string;
  content: string;
  group?: string;
  createAt: string;
  children?: React.ReactNode;
}

export default function Comment(props: CommentProps): JSX.Element {
  const { thumbnail, content, name, group, createAt, children } = props;
  return (
    <StyledComment>
      <ProfilePhoto src={thumbnail} />
      <ContentBox>
        <Profile.Who name={name} group={group} />
        <Content>{content}</Content>
        <span className="date">{createAt}</span>
        <span className="replay-btn">답글 달기</span>
        {children}
      </ContentBox>
    </StyledComment>
  );
}

const StyledComment = styled.li`
  display: flex;
  min-height: 107px;
  padding-top: 14px;
  box-shadow: inset 0 -1px 0 0 ${colors.blackF5F6F7};
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
  }
`;

const Content = styled.div`
  margin: 5px 0 10px;
  line-height: 20px;
  font-size: 15px;
`;
