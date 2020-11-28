import React from 'react';
import { Callback } from '../../types';
import Comment from '../../types/Comment';

export { observer } from 'mobx-react';


const CommentContext = React.createContext<{
  comments: Comment[];
  fetchRefresh: () => void;
  handleWriteComment: (content: string, callback: Callback<Comment>) => void;
}>({
  comments: [],
  fetchRefresh: () => console.log('not initialized'),
  handleWriteComment: () => console.log('not initialized'),
});

CommentContext.displayName = 'CommentContext';

export const useCommentContext = () => {
  return React.useContext(CommentContext);
};

export default CommentContext;