/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import Icon from '../Icon';

interface ArticleFooterProps {
  viewCount: number;
  commentCount: number;
  sympathyCount: number;
  emojiHappy: number;
}

export default function ArticleFooter(props: ArticleFooterProps): JSX.Element {
  const { viewCount, commentCount, sympathyCount, emojiHappy } = props;
  return (
    <Self>
      <InteractionCounter>
        <ul>
          <li>{`조회 ${viewCount}회`}</li>
          <li>{`댓글 ${commentCount}`}</li>
          <li>{`공감 ${sympathyCount}`}</li>
        </ul>
        <Icon icon="emojiLove" size="18px" />
        <span>{emojiHappy}</span>
      </InteractionCounter>
      <InteractionPanel />
    </Self>
  );
}

const Self = styled.div``;

const InteractionCounter = styled.div`
  display: flex;
  padding: 4px 18px 15px 18px;
  ul {
    display: flex;
    flex: 1;
    color: ${colors.black99};
    font-size: 13px;
  }
  li + li {
    position: relative;
    margin-left: 12px;
    &::before {
      content: '·';
      position: absolute;
      left: -10px;
      top: 0;
      font-weight: 600;
    }
  }
  span {
    font-size: 15px;
    color: ${colors.black66};
    margin-left: 5px;
  }
`;
const InteractionPanel = styled.div``;
