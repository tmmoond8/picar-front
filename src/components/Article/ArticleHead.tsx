/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import ProfilePhoto from '../ProfilePhoto';

interface ArticleHeadProps {
  authorId: string;
  name: string;
  group?: string;
  createdDate: string;
}

export default function ArticleHead(props: ArticleHeadProps): JSX.Element {
  const { authorId, name, group, createdDate } = props;
  return (
    <Self>
      <ProfilePhoto onClick={() => console.log(authorId)} />
      <Content>
        <span className="author-name">{name}</span>
        {group && <span className="author-group">{group}</span>}
        <p className="date">{createdDate}</p>
      </Content>
    </Self>
  );
}

const Self = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0 16px;
`;

const Content = styled.div`
  margin: 0 0 0 13px;
  .author-name {
    font-size: 15px;
    color: ${colors.black50};
  }

  .author-group {
    position: relative;
    margin: 0 0 0 14px;
    font-size: 15px;
    color: ${colors.black99};
    &::before {
      content: '·';
      position: absolute;
      width: 10px;
      height: 10px;
      left: -10px;
      top: 4px;
    }
  }

  .date {
    margin: 1px 0 0 0;
    font-size: 13px;
    color: ${colors.black99};
  }
`;
