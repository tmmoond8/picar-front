/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import { colors } from '../../styles';

interface ArticleCardBottomProps {
  emotionCount: number;
  commentCount: number;
  bookmark: boolean;
  handleClickBookmark: () => void;
}

const ArticleCardHead: React.FC<ArticleCardBottomProps> = (props) => {
  const { emotionCount, commentCount, bookmark, handleClickBookmark } = props;
  return (
    <Bottom>
      <Button icon={<Icon icon="emojiSmile" size="18px" />} onClick={() => {}}>
        <Counter className="Counter">{emotionCount}</Counter>
      </Button>
      <Button icon={<Icon icon="chat" size="18px" />} onClick={() => {}}>
        <Counter className="Counter">{commentCount}</Counter>
      </Button>
      <div className="right">
        <BookmarkButton
          marked={bookmark}
          onClick={handleClickBookmark}
          icon={<Icon icon="bookmark" size="18px" />}
        />
      </div>
    </Bottom>
  );
};

export default ArticleCardHead;

const Bottom = styled.div`
  display: flex;
  height: 32px;

  & > button {
    cursor: auto;
    border: none;
  }
  * + * {
    margin-left: 8px;
  }
  margin-top: 4px;
  .right {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }
`;

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;

const BookmarkButton = styled(Button)<{ marked: boolean }>`
  width: 41px;
  height: 28px;
  transition: background-color 0.3s ease-in-out;
  svg {
    margin: 0 auto;
    cursor: pointer;
  }
  ${(p) =>
    p.marked &&
    css`
      background-color: ${colors.primaryE};
      border: none;
      svg {
        color: ${colors.primary3};
      }
    `}
`;
