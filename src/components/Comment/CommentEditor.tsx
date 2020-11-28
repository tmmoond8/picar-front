/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Icon from '../Icon';
import { colors } from '../../styles';
import { useCommentContext, observer } from './context';

const CommentEditor = () => {
  const [content, setContent] = React.useState('');
  const handleChangeContent = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );
  const { handleWriteComment, about } = useCommentContext();
  const placeholder = React.useMemo(
    () => `${about === null ? '댓글' : '답글'}을 입력하세요`,
    [about],
  );

  return (
    <Editor>
      <Icon icon="emojiSmile" size="24px" />
      <Context
        value={content}
        onChange={handleChangeContent}
        placeholder={placeholder}
        rows={3}
      />
      <button
        onClick={() =>
          handleWriteComment(
            content,
            (_, error) => {
              if (error) {
                console.error('error');
              } else {
                setContent('');
              }
            },
            about ?? undefined,
          )
        }
      >
        게시
      </button>
    </Editor>
  );
};

export default observer(CommentEditor);

const Editor = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: flex-start;
  padding: 18px;
  background: ${colors.white};

  button {
    color: ${colors.primary4};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }
`;
const Context = styled.textarea`
  position: relative;
  flex: 1;
  height: auto;
  max-height: 64px;
  margin: 0 16px;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  /* resize: none; */
  &::placeholder {
    color: ${colors.black99};
  }
  outline: none;
  border: none;
`;
