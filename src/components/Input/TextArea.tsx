/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';

const TextArea: React.FC<{
  className?: string;
  name?: string;
  text: string;
  setText: (text: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string;
}> = ({ name, className, text, setText, placeholder = '', onKeyDown = () => {} }) => {
  return (
    <StyledTextArea className={cx(className, name)}>
      <HiddenText className={cx('Input', 'HiddenText')}>{text || 'ㅤ'}</HiddenText>
      <TextAreaBox 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={cx('Input', 'TextAreaBox')}
        onKeyDown={onKeyDown}
      />
    </StyledTextArea>
  );
};

export default React.memo(TextArea);

const StyledTextArea = styled.div<{ placeholder?: string }>`
  position: relative;
  flex: 1;
  height: auto;
  min-height: 22px;
  margin: 24px 0 0 0;
  order: 1;
  overflow-y: auto;

  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;
`;

const defaultStyle = css`
  height: 100%;
  width: 100%;

  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.73;
  letter-spacing: normal;
`;

const TextAreaBox = styled.textarea`
  ${defaultStyle};
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  padding: 0;
  resize: none;
  overflow: hidden;
  &::placeholder {
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.black99};
    pointer-events: none;
  }
`;

const HiddenText = styled.p`
  ${defaultStyle};
  word-break: break-all;
  white-space: pre-line;
  visibility: hidden;
`;
