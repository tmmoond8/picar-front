/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import BottomSheet from '../BottomSheet';
import { colors } from '../../styles';
import Icon from '../Icon';
import Comment from '.';
import Button from '../Button';
import { useStore } from '../../stores';

const CommentCounter: React.FC<{
  articleId: number;
  articleAuthorCode: string;
  commentCount: number;
  hasComment: boolean;
}> = ({
  articleId,
  articleAuthorCode,
  commentCount: _commentCount,
  hasComment,
}) => {
  const { user } = useStore();
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
            profilePhoto={user.profile.profileImage ?? ''}
            articleAuthorCode={articleAuthorCode}
            userCode={user.profile.code}
            handleClose={bottomSheet.close}
          />
        ),
      });
    }
  }, [
    articleAuthorCode,
    articleId,
    bottomSheet,
    commentCount,
    user.profile.code,
    user.profile.profileImage,
  ]);
  const color = React.useMemo(() => (hasComment ? colors.primary : undefined), [
    hasComment,
  ]);

  return (
    <CommentCounterButton
      icon={<Icon icon="chat" size="18px" color={color} />}
      onClick={handleClickComment}
    >
      <Counter className="Counter" color={color}>
        {commentCount}
      </Counter>
    </CommentCounterButton>
  );
};

export default React.memo(CommentCounter);

const CommentCounterButton = styled(Button)`
  && {
    border-radius: 4px;
    border: solid 1px #ebebeb;
    cursor: pointer;
    svg {
      cursor: pointer;
    }
  }
`;

const Counter = styled.span<{ color?: string }>`
  &.Counter {
    margin-left: 0;
    ${(p) => p.color && `color: ${p.color};`}
  }
`;
