/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';
import Icon from '../Icon';
import { useStore, observer } from '../../stores';
import { getVirtualKeyboardHeight } from '../../modules/virtualKeyboardHeight';

interface TextFieldOutlineProps {
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  rows?: number;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  onBlur?: () => void;
}

const ENTER_KEYCODE = 13;

const TextFieldOutline: React.FC<TextFieldOutlineProps> = (props) => {
  const {
    label,
    id,
    placeholder = '',
    value = '',
    maxLength,
    onChange,
    errorMessage,
    className,
    rows = 1,
    onBlur = () => {},
  } = props;
  const { ui } = useStore();
  const [isFocus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleFocus = React.useCallback(() => {
    setFocus(true);
    ui.setKeyboardMargin(getVirtualKeyboardHeight());
  }, [ui]);

  const handleBlur = React.useCallback(() => {
    onBlur();
    setFocus(false);
    ui.setKeyboardMargin(0);
  }, [onBlur, ui]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (rows === 1 && e.keyCode === ENTER_KEYCODE) {
      e.preventDefault();
    }
  };

  return (
    <Wrapper className={cx('TextFieldOutline', className)}>
      <Label>
        {label && (
          <label className="label" htmlFor={id}>
            {label}
          </label>
        )}
        {maxLength && (
          <span className="length">{`${value.length}/${maxLength}`}</span>
        )}
      </Label>
      <Field
        className="Field"
        error={!!errorMessage}
        focus={isFocus}
        placeholder={placeholder}
        id={id}
        ref={inputRef}
        rows={rows}
        value={value}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onChange={onChange}
        onBlur={handleBlur}
      />
    </Wrapper>
  );
};

export default observer(TextFieldOutline);

const Wrapper = styled.div`
  padding: 12px 0;
  color: ${colors.black77};
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;

  .label {
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    opacity: 0.99;
  }

  .length {
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    opacity: 0.99;
  }
`;

const Field = styled.textarea<{ error: boolean; focus: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  margin-top: 12px;
  padding: 13px 18px;
  color: ${colors.black22};
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid ${colors.blackEB};
  border-radius: 8px;
  outline: none;
  resize: none;

  ${(p) =>
    p.focus &&
    css`
      border: 1px solid ${colors.black33};
    `}
`;
