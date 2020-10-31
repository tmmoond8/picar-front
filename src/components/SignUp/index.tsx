/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { SignUpUser } from '../../types/User';

export default function SignUp(props: SignUpUser): JSX.Element {
  const [nickname, onChangeNickname] = Input.useTextField('abc');
  return <div>회원가입 폼</div>;
}
