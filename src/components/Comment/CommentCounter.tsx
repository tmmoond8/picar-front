/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useModal } from '../Modal';
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
  const modal = useModal();

  const handleClickComment = React.useCallback(() => {
    if (articleId) {
      // TODO userCode, profilePhoto 넣어줘야 함
      modal.open({
        title: `댓글 ${commentCount}`,
        contents: (
          <Comment
            articleId={articleId}
            setCommentCount={setCommentCount}
            profilePhoto={user.profile.profileImage ?? ''}
            articleAuthorCode={articleAuthorCode}
            userCode={user.profile.code}
            handleClose={modal.close}
          />
        ),
      });
    }
  }, [
    articleAuthorCode,
    articleId,
    modal,
    commentCount,
    user.profile.code,
    user.profile.profileImage,
  ]);

  return (
    <CommentCounterButton
      icon={<Icon icon="chat" size="18px" />}
      onClick={handleClickComment}
      hasComment={hasComment}
    >
      <span className="Counter">{commentCount}</span>
    </CommentCounterButton>
  );
};

export default React.memo(CommentCounter);

const CommentCounterButton = styled(Button)<{ hasComment: boolean }>`
  && {
    border-radius: 4px;
    border: solid 1px #ebebeb;
    transition: background-color 1s ease-out;
    cursor: pointer;
    .Icon.chat {
      cursor: pointer;
    }
    .Counter {
      margin-left: 0;
    }
    ${(p) =>
      p.hasComment &&
      css`
        color: ${colors.primary2};
        background-color: ${colors.primaryE};
        border: solid 1px ${colors.transparent};
        .Counter,
        .Icon.chat {
          color: ${colors.primary2};
        }
      `}
  }
`;
