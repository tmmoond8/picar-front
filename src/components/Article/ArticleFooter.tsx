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
      <InteractionPanel>
        <ul>
          <li>
            <Icon icon="emojiSmile" size="20px" /> 공감표현
          </li>
          <li>
            <Icon icon="chatOutline" size="20px" /> 댓글쓰기
          </li>
          <li>
            <Icon icon="emojiSmile" size="20px" /> 공감표현
          </li>
        </ul>
      </InteractionPanel>
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
const InteractionPanel = styled.div`
  height: 54px;
  color: ${colors.black66};
  box-shadow: inset 0 0.5px 0 0 ${colors.blackEB};

  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 307px;
    height: 100%;
    margin: 0 auto;
    font-size: 14px;
    li {
      display: flex;
      align-items: center;

      svg {
        margin-right: 6px;
      }
    }
  }
`;
