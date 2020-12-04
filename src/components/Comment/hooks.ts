import React from 'react';
import Comment from '../../types/Comment';
import API from '../../apis';
import { Callback } from '../../types';

export const useFetch = (articleId: number): [Comment[], (comments: Comment[]) => void] => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  React.useEffect(() => {
    (async () => {
      const { data: { comments, ok } } = await API.comment.list(articleId);
      if (ok) {
        setComments(comments);
      }
    })();
  }, [articleId])

  return [
    comments,
    setComments,
  ]
}

export const useWriteComment = (params: {
  articleId: number; 
  comments: Comment[];
  setCommentCount: (count: number) => void; 
  setComments: (comemnts: Comment[]) => void;
}) => {
  const handleWriteComment = React.useCallback(async (content: string, callback: Callback<Comment>, about?: string) => {
    const { articleId, comments, setComments, setCommentCount } = params;
    try {
      const { data: { ok, comment } } = await API.comment.write({
        articleId,
        content,
        about,
      });
        if (ok) {
          if (comment.about) {
            const aboutCommentIndex = comments.findIndex(
              (comment) => comment.id === about,
            );
            comments[aboutCommentIndex].replies!.push(comment);
            setComments([...comments]);
          } else {
            setComments([...comments, comment]);
            setCommentCount(comments.length + 1);
          }
          callback(comment);
        } else {
          callback(null, 'server error');
        }
    } catch(error) {
      console.error(error);
      callback(null, 'network error');
    }
  },[params]);
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