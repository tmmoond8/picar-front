/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Icon from '../Icon';
import { colors } from '../../styles';
import { useWriteComment } from './hooks';

const CommentEditor: React.FC<{ articleId: number }> = ({ articleId }) => {
  const [content, setContent] = React.useState('');
  const handleChangeContent = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );
  const { handleWriteComment, refreshId } = useWriteComment(articleId, content);

  return (
    <Editor>
      <Icon icon="emojiSmile" size="24px" />
      <Context
        value={content}
        onChange={handleChangeContent}
        placeholder="댓글을 입력하세요"
      />
      <button onClick={handleWriteComment}>게시</button>
    </Editor>
  );
};

export default CommentEditor;

const Editor = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 14px 19px;
  background: ${colors.white};

  button {
    color: ${colors.primary4};
    font-weight: 500;
    font-size: 15px;
  }
`;
const Context = styled.textarea`
  position: relative;
  flex: 1;
  height: 64px;
  margin: 0 16px;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  resize: none;
  &::placeholder {
    color: ${colors.black99};
  }
  outline: none;
  border: none;
`;
