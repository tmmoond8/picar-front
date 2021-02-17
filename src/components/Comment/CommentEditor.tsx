/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useStore } from '../../stores';
import Profile from '../Profile';
import Icon from '../Icon';
import Button from '../Button';
import { colors } from '../../styles';
import { useCommentContext, observer } from './context';

const CommentEditor = () => {
  const { user, ui } = useStore();
  const [content, setContent] = React.useState('');
  const textEditableRef = React.useRef<HTMLDivElement>(null);
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
    setEditorRef,
    handleClose,
  } = useCommentContext();

  React.useEffect(() => {
    setEditorRef(textEditableRef);
  }, [setEditorRef, textEditableRef]);

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
  }, [about, clearAbout, content, handleClose, handleWriteComment, user]);

  const placeholder = React.useMemo(() => {
    if (content.length > 0) return undefined;
    return `${about === null ? '댓글' : '답글'}을 입력하세요`;
  }, [about, content.length]);
  const disabled = React.useMemo(() => content.trim().length === 0, [content]);

  const clickNeedLogin = React.useCallback(() => {
    if (user.needLogin()) {
      typeof handleClose === 'function' && handleClose();
      return;
    }
  }, [user, handleClose])
  

  return (
    <Editor hasContent={content.length > 0} className="CommentWrapper" >
      {user.isLogined && (
        <React.Fragment>
          <Content
          className="CommentEditor"
          ref={textEditableRef as React.RefObject<HTMLDivElement>}
          contentEditable
          placeholder={placeholder}
          onInput={handleChangeContent}
        />
        {user.isLogined && <UserPhoto src={profilePhoto} />}
        {ui.queryMatch.Mobile && <SendIconButton
          disabled={disabled}
          icon="send"
          size="24px"
          onClick={handleClickSend}
        />}
        {!ui.queryMatch.Mobile && <SendButton disabled={disabled} onClick={handleClickSend}>댓글작성</SendButton>}
        </React.Fragment>
      ) }
      {!user.isLogined && (
        <NeedLogin onClick={clickNeedLogin}>로그인이 필요합니다.</NeedLogin>
      )}
    </Editor>
  );
};

export default observer(CommentEditor);

const Editor = styled.div<{ hasContent: boolean;}>`
  display: flex;
  position: fixed;
  left: 0;
  bottom: env(safe-area-inset-bottom);
  width: 100%;
  align-items: center;
  padding: 18px;
  background: ${colors.white};
  border-top: 1px solid ${colors.blackF5F6F7};

  button {
    color: ${colors.primary4};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }

  .CommentEditor:focus + img[src] {
    display: block;
  }

  ${(p) =>
    p.hasContent &&
    css`
      img[src] {
        display: block;
      }
    `}
`;
const Content = styled.div<{ placeholder?: string }>`
  position: relative;
  flex: 1;
  height: auto;
  min-height: 22px;
  max-height: 70px;
  margin: 0 16px;
  order: 1;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  overflow-y: auto;

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

const SendButton = styled(Button)<{disabled: boolean}>`
  position: absolute;
  bottom: 18px;
  right: 20px;
  font-size: 15px;
  font-weight: bold;
  color: ${colors.blackBF};
  border: none;
  outline: none;
  pointer-events: ${p => p.disabled ? 'none': 'pointer'};
`

const NeedLogin = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${colors.black99};
  cursor: pointer;
`;