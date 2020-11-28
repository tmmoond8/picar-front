/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Comment from './Comment';
import CommentEditor from './CommentEditor';

import CommentContext from './context';
import { useFectch, useWriteComment, useAbout } from './hooks';

const CommentArea: React.FC<{ articleId: number }> = ({ articleId }) => {
  const { comments, fetchRefresh } = useFectch(articleId);
  const handleWriteComment = useWriteComment(articleId, fetchRefresh);
  const { about, handleClickReply } = useAbout();

  return (
    <CommentContext.Provider
      value={{
        comments,
        fetchRefresh,
        handleWriteComment,
        handleClickReply,
        about,
      }}
    >
      <Area>
        <CommentList>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              authorId={comment.author.id}
              name={comment.author.name}
              group={comment.author.group}
              createAt={comment.createAt}
              content={comment.content}
              thumbnail={comment.author.thumbnail}
            >
              <ReplyList>
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    id={comment.id}
                    authorId={reply.author.id}
                    name={reply.author.name}
                    group={reply.author.group}
                    createAt={reply.createAt}
                    content={reply.content}
                    thumbnail={reply.author.thumbnail}
                  />
                ))}
              </ReplyList>
            </Comment>
          ))}
        </CommentList>
        <CommentEditor />
      </Area>
    </CommentContext.Provider>
  );
};
export default CommentArea;

const Area = styled.div`
  padding: 0 19px 92px;
  h3 {
    height: 59px;
    font-size: 14px;
    font-weight: 500;
    line-height: 59px;
    letter-spacing: -0.25px;
    color: #3e4045;
  }
`;

const CommentList = styled.ol``;

const ReplyList = styled.ol`
  margin-top: 20px;
`;
