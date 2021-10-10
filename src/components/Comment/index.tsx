/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore, observer } from '../../stores';
import CommentContext from './context';
import CommentViewer from './CommentViewer';
import { colors } from '../../styles';
import { useFetch, useWriteComment, useAbout, useRemoveComment } from './hooks';

const CommentArea: React.FC<{
  articleId: number;
  setCommentCount: (count: number) => void;
  userCode: string;
  articleAuthorCode: string;
  profilePhoto?: string;
  showCount?: boolean;
  handleClose?: () => void;
}> = ({
  articleId,
  setCommentCount,
  profilePhoto = 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735392/noticon/ggaqjh4wfjf0miavt4dc.png',
  userCode,
  articleAuthorCode,
  showCount = false,
  handleClose,
}) => {
  const { ui } = useStore();
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
      <ResponsibleComment
        desktop={!ui.queryMatch.Mobile}
        showCount={showCount}
      />
    </CommentContext.Provider>
  );
};

export default observer(CommentArea);

const ResponsibleComment = styled(CommentViewer)<{ desktop: boolean }>`
  ${(p) =>
    p.desktop &&
    css`
      padding: 0;
      .CommentWrapper {
        position: relative;
        height: auto;
        padding: 16px 24px 60px 24px;
        .CommentEditor {
          min-height: 68px;
          max-height: 156px;
          margin: 0 0 0 16px;
          padding: 12px 16px;
          border-radius: 4px;
          border: solid 1px ${colors.blackEB};
          background-color: ${colors.blackF7};
        }
        .CommentEditor:after {
          left: 16px;
          top: 12px;
        }

        .CommentEditor + img[src] {
          display: block;
        }
        .UserProfilePhoto {
          align-self: flex-start;
          display: block;
          animation: none;
        }
      }

      .CommentList {
        padding: 0 0 16px 0;
        .Empty {
          margin: 0 0 180px 0;
        }
      }
    `}
`;
