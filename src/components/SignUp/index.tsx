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

export default function SignUp(props: SignUpUser): JSX.Element {
  const [nickname, onChangeNickname] = Input.useTextField('');
  return (
    <Form>
      <TextField
        id="signup-nickname"
        label="닉네임"
        onChange={onChangeNickname}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
      />
    </Form>
  );
}
