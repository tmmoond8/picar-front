/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import BottomSheet from '../BottomSheet';
import { colors } from '../../styles';
import Icon from '../Icon';
import Comment from '../Comment';
import Button from '../Button';

const CommentCounter: React.FC<{ articleId: number; commentCount: number }> = ({
  articleId,
  commentCount: _commentCount,
}) => {
  const [commentCount, setCommentCount] = React.useState(_commentCount);
  const bottomSheet = BottomSheet.useBottomSheet();

  const handleClickComment = React.useCallback(() => {
    if (articleId) {
      // TODO userCode, profilePhoto 넣어줘야 함
      bottomSheet.open({
        title: `댓글 ${commentCount}`,
        contents: (
          <Comment
            articleId={articleId}
            setCommentCount={setCommentCount}
            profilePhoto="url"
            userCode="tmp"
          />
        ),
      });
    }
  }, [bottomSheet, articleId, commentCount]);
  const color = React.useMemo(() => (false ? colors.primary : undefined), []);

  return (
    <Button
      icon={<Icon icon="chat" size="18px" color={color} />}
      onClick={handleClickComment}
    >
      <Counter className="Counter" color={color}>
        {commentCount}
      </Counter>
    </Button>
  );
};

export default React.memo(CommentCounter);

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;
