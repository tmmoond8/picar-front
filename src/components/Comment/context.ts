import React from 'react';
import { Callback } from '../../types';
import Comment from '../../types/Comment';

export { observer } from 'mobx-react';


const CommentContext = React.createContext<{
  comments: Comment[];
  handleWriteComment: (content: string, callback: Callback<Comment>, about?: string) => void;
  handleRemoveComment: (commentId: string) => void;
  handleClickReply: (commentId: string) => void;
  clearAbout: () => void;
  removeComments: (comments: Comment) => void;
  updateComments: (comments: Comment) => void;
  about: string | null;
  userCode: string;
  profilePhoto: string;
}>({
  comments: [],
  handleWriteComment: () => console.log('not initialized'),
  handleRemoveComment: () => console.log('not initialized'),
  handleClickReply: () => console.log('not initialized'),
  clearAbout: () => console.log('not initialized'),
  removeComments: () => console.log('not initialized'),
  updateComments: () => console.log('not initialized'),
  about: null,
  userCode: 'guest',
  profilePhoto: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1592041365/noticon/miarefknyt8tmn9neo3p.png',
});

CommentContext.displayName = 'CommentContext';

export const useCommentContext = () => {
  return React.useContext(CommentContext);
};

export default CommentContext;