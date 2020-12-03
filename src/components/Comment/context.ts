import React from 'react';
import { Callback } from '../../types';
import Comment from '../../types/Comment';

export { observer } from 'mobx-react';


const CommentContext = React.createContext<{
  comments: Comment[];
  handleWriteComment: (content: string, callback: Callback<Comment>, about?: string) => void;
  handleClickReply: (commentId: string) => void;
  setCommentCount: (count: number) => void;
  addComments: (comments: Comment) => void;
  removeComments: (comments: Comment) => void;
  updateComments: (comments: Comment) => void;
  about: string | null;
}>({
  comments: [],
  handleWriteComment: () => console.log('not initialized'),
  handleClickReply: () => console.log('not initialized'),
  setCommentCount: () => console.log('not initialized'),
  addComments: () => console.log('not initialized'),
  removeComments: () => console.log('not initialized'),
  updateComments: () => console.log('not initialized'),
  about: null,
});

CommentContext.displayName = 'CommentContext';

export const useCommentContext = () => {
  return React.useContext(CommentContext);
};

export default CommentContext;