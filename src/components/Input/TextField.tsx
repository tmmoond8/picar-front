/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import cx from 'classnames';
import { colors } from '../../styles';
import Icon from '../Icon';
import { useStore, observer } from '../../stores';
import { getVirtualKeyboardHeight } from '../../modules/virtualKeyboardHeight';

interface TextFieldProps {
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClear?: () => void;
  errorMessage?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  autocomplete?: boolean;
  type?: 'text' | 'password';
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    id,
    placeholder = '',
    value = '',
    onChange,
    errorMessage,
    className,
    onBlur = () => {},
    onFocus = () => {},
    onKeyDown = () => {},
    onClear,
    autocomplete = true,
    type = 'text',
  } = props;
  const { ui } = useStore();
  const [isFocus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = React.useCallback(
    (e) => {
      e.preventDefault();
      if (typeof onClear === 'function') {
        onClear();
      }
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.focus();
      }
    },
    [onClear],
  );

  const handleFocus = React.useCallback(() => {
    setFocus(true);
    onFocus();
    ui.setKeyboardMargin(getVirtualKeyboardHeight());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui]);

  const handleBlur = React.useCallback(() => {
    onBlur();
    setFocus(false);
    ui.setKeyboardMargin(0);
  }, [onBlur, ui]);

  return (
    <Wrapper className={cx('TextField', className)}>
      {label && (
        <label className="Label" htmlFor={id}>
          {label}
        </label>
      )}
      <Field className="Field" error={!!errorMessage} focus={isFocus}>
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={onChange}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          autoComplete={autocomplete ? 'on' : 'off'}
        />
        {value.length > 0 && onClear && (
          <ClearButton onClick={handleClear}>
            <Icon icon="inputClear" size="20px" />
          </ClearButton>
        )}
      </Field>
    </Wrapper>
  );
};

export default observer(TextField);

const Wrapper = styled.div`
  padding: 12px 0;
  color: ${colors.black77};
  .Label {
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    opacity: 0.99;
  }
`;

const Field = styled.div<{ error: boolean; focus: boolean }>`
  display: flex;
  height: 48px;
  margin-top: 9px;
  align-items: center;
  border-bottom: 1px solid ${colors.blackEB};

  input {
    width: 100%;
    color: ${colors.black22};
    font-size: 19px;
    outline: none;
    border: none;
  }
  input::placeholder {
    color: ${colors.black99};
    font-weight: 400;
  }

  ${(p) =>
    p.focus &&
    css`
      border-bottom: 1px solid ${colors.black33};
    `}
`;

const ClearButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
`;
