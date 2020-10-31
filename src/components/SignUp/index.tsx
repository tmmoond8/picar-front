/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Input from '../Input';
import Button from '../Button';

import { SignUpUser } from '../../types/User';

const Form = styled.form`
  height: 100%;
  padding: 16px;
`;

const TextField = styled(Input.TextField)``;
const Switch = styled(Input.Switch)`
  margin-top: 10px;
`;
const BobbomCTA = styled(Button.Full)`
  position: absolute;
  bottom: 0;
  width: calc(100%);
  margin: 0 -16px;
`;

export default function SignUp(props: SignUpUser): JSX.Element {
  const [nickname, onChangeNickname, clearNickname] = Input.useTextField('');
  const { values, currentValue, setCurrentValue } = Input.useSwitch([
    '오너',
    '예비오너',
  ]);

  const handleNext = React.useCallback(() => {
    console.log('abc');
  }, []);
  return (
    <Form>
      <TextField
        id="signup-nickname"
        label="닉네임"
        onChange={onChangeNickname}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
        onClear={clearNickname}
        autocomplete={false}
      />
      <Switch
        label="직업"
        values={values}
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
      />
      <BobbomCTA onClick={handleNext}>다음</BobbomCTA>
    </Form>
  );
}
