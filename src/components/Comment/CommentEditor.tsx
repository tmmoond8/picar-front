/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
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
  const { handleWriteComment, about, profilePhoto } = useCommentContext();
  const placeholder = React.useMemo(
    () => `${about === null ? '댓글' : '답글'}을 입력하세요`,
    [about],
  );

  const handleClickSend = React.useCallback(() => {
    handleWriteComment(
      content,
      (result, error) => {
        if (error) {
          console.error('error');
        } else {
          setContent('');
        }
      },
      about ?? undefined,
    );
  }, [about, content, handleWriteComment]);

  const disabled = React.useMemo(() => content.trim().length === 0, [content]);

  return (
    <Editor>
      <Profile.Photo src={profilePhoto} />
      <Context
        value={content}
        onChange={handleChangeContent}
        placeholder={placeholder}
        rows={3}
      />
      <SendIconButton
        disabled={disabled}
        icon="send"
        size="24px"
        onClick={handleClickSend}
      />
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

const SendIconButton = styled(Icon)<{ disabled: boolean }>`
  transform: color 0.3s ease-in-out;
  pointer-events: none;
  ${(p) =>
    !p.disabled &&
    css`
      color: ${colors.primary};
      pointer-events: all;
    `}
`;
