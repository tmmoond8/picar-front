/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Profile from '../Profile';
import Icon from '../Icon';
import { colors } from '../../styles';
import { useCommentContext, observer } from './context';

const CommentEditor = () => {
  const [content, setContent] = React.useState('');
  const textEditableRef = React.useRef<HTMLDivElement>();
  const handleChangeContent = React.useCallback(() => {
    if (textEditableRef.current) {
      setContent((textEditableRef.current as any).textContent);
    }
  }, []);
  const {
    handleWriteComment,
    clearAbout,
    about,
    profilePhoto,
  } = useCommentContext();

  const handleClickSend = React.useCallback(() => {
    handleWriteComment(
      content,
      (result, error) => {
        if (error) {
          console.error('error');
        } else {
          setContent('');
          if (textEditableRef.current) {
            (textEditableRef.current as any).textContent = '';
          }
          clearAbout();
        }
      },
      about ?? undefined,
    );
  }, [about, clearAbout, content, handleWriteComment]);

  const placeholder = React.useMemo(() => {
    if (content.length > 0) return undefined;
    return `${about === null ? '댓글' : '답글'}을 입력하세요`;
  }, [about, content.length]);
  const disabled = React.useMemo(() => content.trim().length === 0, [content]);

  return (
    <Editor onTyping={!placeholder}>
      <Context
        className="CommentEditor"
        ref={textEditableRef as React.RefObject<HTMLDivElement>}
        contentEditable
        placeholder={placeholder}
        onInput={handleChangeContent}
      />
      <UserPhoto src={profilePhoto} />
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

const Editor = styled.div<{ onTyping: boolean }>`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: flex-start;
  padding: 18px;
  background: ${colors.white};
  border-top: 1px solid ${colors.blackF5F6F7};
  /* box-shadow: 0 0px 20px 0px ${colors.blackCC}; */

  button {
    color: ${colors.primary4};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }

  .CommentEditor:focus + div {
    display: block;
  }

  ${(p) =>
    p.onTyping &&
    css`
      div[src] {
        display: block;
      }
    `}
`;
const Context = styled.div<{ placeholder?: string }>`
  position: relative;
  flex: 1;
  height: auto;
  min-height: 32px;
  max-height: 70px;
  margin: 0 16px;
  order: 1;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  overflow-y: scroll;

  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;

  &:after {
    content: ${(p) => (p.placeholder ? `'${p.placeholder}'` : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.black99};
    pointer-events: none;
  }

  &:focus {
    &:after {
      content: none;
    }
  }
`;

const pop = keyframes`
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
`;

const UserPhoto = styled(Profile.Photo)`
  display: none;
  order: 0;
  animation: ${pop} 0.3s ease-in-out;
`;

const SendIconButton = styled(Icon)<{ disabled: boolean }>`
  order: 2;
  transform: color 0.3s ease-in-out;
  pointer-events: none;
  ${(p) =>
    !p.disabled &&
    css`
      color: ${colors.primary};
      pointer-events: all;
    `}
`;
