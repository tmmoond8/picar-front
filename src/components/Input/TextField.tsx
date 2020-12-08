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
  onClear?: () => void;
  errorMessage?: string;
  onBlur?: () => void;
  autocomplete?: boolean;
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
    onClear = () => {},
    autocomplete = true,
  } = props;
  const { ui } = useStore();
  const [isFocus, setFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = React.useCallback(
    (e) => {
      e.preventDefault();
      onClear();
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.focus();
      }
    },
    [onClear],
  );

  const handleFocus = React.useCallback(() => {
    console.log('focus');
    setFocus(true);
    ui.setKeyboardMargin(getVirtualKeyboardHeight());
  }, [ui]);

  const handleBlur = React.useCallback(() => {
    onBlur();
    console.log('blur');
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
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={onChange}
          onBlur={handleBlur}
          autoComplete={autocomplete ? 'on' : 'off'}
        />
        {value.length > 0 && (
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
    color: ${colors.blackCC};
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
