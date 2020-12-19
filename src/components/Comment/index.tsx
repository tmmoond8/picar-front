/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { useStore, observer } from '../../stores';
import CommentContext from './context';
import CommentViewer from './CommentViewer';
import { useFetch, useWriteComment, useAbout, useRemoveComment } from './hooks';

const CommentArea: React.FC<{
  articleId: number;
  setCommentCount: (count: number) => void;
  userCode: string;
  articleAuthorCode: string;
  profilePhoto: string;
  handleClose?: () => void;
}> = ({
  articleId,
  setCommentCount,
  profilePhoto,
  userCode,
  articleAuthorCode,
  handleClose,
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
  const [editorRef, setEditorRef] = React.useState(null);
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
        editorRef,
        setEditorRef,
        handleClose,
      }}
    >
      <CommentViewer />
    </CommentContext.Provider>
  );
};

export default observer(CommentArea);
