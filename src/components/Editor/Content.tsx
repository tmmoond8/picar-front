/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Input from '../Input';

const Content: React.FC<{ 
  content: string; 
  setContent: (content: string) => void
}> = ({ content, setContent }) => {
  return (
    <StyledContent
      name="Content"
      text={content} 
      setText={setContent}
      placeholder={content.length > 0 ? '' : '내용을 입력하세요.'}
    />
  )
}

export default Content;

const StyledContent = styled(Input.TextArea)`
  min-height: 250px;
  height: auto;

  .Input {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
  }
`;