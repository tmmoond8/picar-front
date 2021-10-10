/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Input from '../Input';
import { useEditorContext, observer } from './context';

const Title: React.FC = () => {
  const { title, setTitle } = useEditorContext();
  const handleKeyDownTitle = React.useCallback(
    (e) => {
      const allowedKeys = [8, 16, 17, 18, 27, 37, 38, 39, 40, 46, 91, 93];
      if (
        e.keyCode === 13 ||
        (title.length > 32 && !allowedKeys.includes(e.keyCode))
      ) {
        e.preventDefault();
      }
    },
    [title],
  );

  const handleSetTitle = React.useCallback(
    (title: string) => {
      setTitle(title.slice(0, 32));
    },
    [setTitle],
  );

  return (
    <StyledTitle
      name="Title"
      text={title}
      onKeyDown={handleKeyDownTitle}
      setText={handleSetTitle}
      placeholder={title.length > 0 ? '' : '제목을 입력하세요.'}
    />
  );
};

export default observer(Title);

const StyledTitle = styled(Input.TextArea)`
  height: auto;

  .Input {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.58;
  }
`;
