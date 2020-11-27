import React from 'react';
import Comment from '../../types/Comment';
import API from '../../apis';

export const useFectch = (articleId: number) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  React.useEffect(() => {
    (async () => {
      console.log('fetch');
      const { data: { comments, ok } } = await API.comment.list(articleId);
      if (ok) {
        setComments(comments);
      }
    })();
  }, [articleId])

  return comments;
}

export const useWriteComment = (articleId: number, content: string) => {
  const [refreshId, setRefreshId] = React.useState(0);
  const handleWriteComment = React.useCallback(async () => {
    const { data: { ok } } = await API.comment.write({
      articleId,
      content,
    });
      if (ok) {
        setRefreshId(refreshId);
      }
  },[articleId, content, refreshId]);
  return {
    handleWriteComment,
    refreshId,
  };
}