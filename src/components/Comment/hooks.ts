import React from 'react';
import Comment from '../../types/Comment';
import API from '../../apis';

export const useFectch = (articleId: number) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  console.log(articleId);
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