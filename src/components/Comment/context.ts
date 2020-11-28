import React from 'react';
import { Callback } from '../../types';
import Comment from '../../types/Comment';

export { observer } from 'mobx-react';


const CommentContext = React.createContext<{
  comments: Comment[];
  fetchRefresh: () => void;
  handleWriteComment: (content: string, callback: Callback<Comment>, about?: string) => void;
  handleClickReply: (commentId: string) => void;
  about: string | null;
}>({
  comments: [],
  fetchRefresh: () => console.log('not initialized'),
  handleWriteComment: () => console.log('not initialized'),
  handleClickReply: () => console.log('not initialized'),
  about: null,
});

CommentContext.displayName = 'CommentContext';

export const useCommentContext = () => {
  return React.useContext(CommentContext);
};

export default CommentContext;