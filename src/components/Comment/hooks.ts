import React from 'react';
import Comment from '../../types/Comment';
import API from '../../apis';
import { Callback } from '../../types';

export const useFetch = (articleId: number) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [refreshId, setRefreshId] = React.useState(0);
  React.useEffect(() => {
    (async () => {
      const { data: { comments, ok } } = await API.comment.list(articleId);
      if (ok) {
        setComments(comments);
      }
    })();
  }, [articleId, refreshId])

  return {
    comments,
    fetchRefresh: () => setRefreshId(refreshId + 1),
  };
}

export const useWriteComment = (articleId: number, refreshFetch: () => void) => {
  const handleWriteComment = React.useCallback(async (content: string, callback: Callback<Comment>, about?: string) => {
    try {
      const { data: { ok, comment } } = await API.comment.write({
        articleId,
        content,
        about,
      });
        if (ok) {
          refreshFetch();
          callback(comment as Comment);
        } else {
          callback(null, 'server error');
        }
    } catch(error) {
      callback(null, 'network error');
    }
  },[articleId, refreshFetch]);
  return handleWriteComment;
}

export const useAbout = () => {
  const [about, setAbout] = React.useState<null | string>(null);
  const handleClickReply = (commentId: string) => {
    setAbout(commentId === about ? null : commentId);
  };

  return {
    about,
    handleClickReply,
  }
}