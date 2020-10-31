/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Input from '../Input';

import { SignUpUser } from '../../types/User';

const Form = styled.form`
  padding: 16px;
`;

const TextField = styled(Input.TextField)``;
const Switch = styled(Input.Switch)``;

export default function SignUp(props: SignUpUser): JSX.Element {
  const [nickname, onChangeNickname] = Input.useTextField('');
  const { values, currentValue, setCurrentValue } = Input.useSwitch([
    '오너',
    '예비오너',
  ]);
  return (
    <Form>
      <TextField
        id="signup-nickname"
        label="닉네임"
        onChange={onChangeNickname}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
      />
      <Switch
        label="직업"
        values={values}
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
      />
    </Form>
  );
}
