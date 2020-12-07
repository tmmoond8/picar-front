/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { observer } from '../../stores';
import CommentContext from './context';
import CommentViewer from './CommentViewer';
import { useFetch, useWriteComment, useAbout, useRemoveComment } from './hooks';

const CommentArea: React.FC<{
  articleId: number;
  setCommentCount: (count: number) => void;
  userCode: string;
  articleAuthorCode: string;
  profilePhoto: string;
}> = ({
  articleId,
  setCommentCount,
  profilePhoto,
  userCode,
  articleAuthorCode,
}) => {
  const [comments, setComments] = useFetch(articleId);
  const handleWriteComment = useWriteComment({
    articleId,
    comments,
    setCommentCount,
    setComments,
  });
  const handleRemoveComment = useRemoveComment({
    comments,
    setCommentCount,
    setComments,
  });
  const { about, handleClickReply, clearAbout } = useAbout();
  const updateComments = React.useCallback(() => {
    console.log('updateComments', comments);
  }, [comments]);
  const removeComments = React.useCallback(() => {
    console.log('removeComments', comments);
  }, [comments]);

  return (
    <CommentContext.Provider
      value={{
        profilePhoto,
        comments,
        handleWriteComment,
        handleRemoveComment,
        handleClickReply,
        clearAbout,
        updateComments,
        removeComments,
        articleAuthorCode,
        userCode,
        about,
      }}
    >
      <CommentViewer />
    </CommentContext.Provider>
  );
};

export default observer(CommentArea);
