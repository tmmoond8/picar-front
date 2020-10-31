/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { colors } from '../../styles';

interface TextFieldProps {
  className?: string;
  id: string;
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  onBlur?: () => void;
}

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
`;

export default function TextField(props: TextFieldProps): JSX.Element {
  const {
    label,
    id,
    placeholder = '',
    value = '',
    onChange,
    errorMessage,
    className,
    onBlur = () => {},
  } = props;
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current) {
      const focusEvent = (): void => setFocus(true);
      const blurEvent = (): void => setFocus(false);

      const inputElement = inputRef.current;
      inputElement.addEventListener('focus', focusEvent);
      inputElement.addEventListener('blur', blurEvent);
      return (): void => {
        inputElement.removeEventListener('focus', focusEvent);
        inputElement.removeEventListener('blur', blurEvent);
      };
    }
    return (): void => {};
  }, [inputRef]);

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
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Wrapper>
  );
}
