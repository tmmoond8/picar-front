/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Comment from './Comment';
import CommentEditor from './CommentEditor';

import CommentContext from './context';
import { useFetch, useWriteComment, useAbout } from './hooks';
import CommentType from '../../types/Comment';

const CommentArea: React.FC<{
  articleId: number;
  setCommentCount: (count: number) => void;
}> = ({ articleId, setCommentCount }) => {
  const [comments, setComments] = useFetch(articleId);
  const handleWriteComment = useWriteComment({
    articleId,
    setCommentCount,
    setComments,
  });
  const { about, handleClickReply } = useAbout();
  const addComments = React.useCallback(
    (comment: CommentType) => {
      if (comment.about) {
        const aboutCommentIndex = comments.findIndex(
          (comment) => comment.id === about,
        );
        comments[aboutCommentIndex].replies!.push(comment);
        setComments([...comments]);
      } else {
        setComments([...comments, comment]);
      }
    },
    [about, comments, setComments],
  );
  const updateComments = React.useCallback(() => {
    console.log('updateComments', comments);
  }, [comments]);
  const removeComments = React.useCallback(() => {
    console.log('removeComments', comments);
  }, [comments]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        handleWriteComment,
        handleClickReply,
        setCommentCount,
        addComments,
        updateComments,
        removeComments,
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
                {comment.replies &&
                  comment.replies.map((reply) => (
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
  padding: 0 0 92px;
  h3 {
    height: 59px;
    font-size: 14px;
    font-weight: 500;
    line-height: 59px;
    letter-spacing: -0.25px;
    color: #3e4045;
  }
`;

const CommentList = styled.ol`
  overflow: hidden;
`;

const ReplyList = styled.ol`
  margin-top: 20px;
  & > li {
    background-color: white;
    box-shadow: -100px 0 white, 150px 0 white, 250px 0 white, 350px 0 white,
      450px 0 white, 550px 0 white, 650px 0 white, 750px 0 white, 850px 0 white,
      950px 0 white, 1050px 0 white, 950px 0 white, 1250px 0 white,
      1150px 0 white, 1450px 0 white, 1350px 0 white, 1650px 0 white,
      1550px 0 white;
  }
`;
