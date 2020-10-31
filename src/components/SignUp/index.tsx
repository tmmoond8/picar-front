/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import SignupContext from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';

import Input from '../Input';
import Button from '../Button';

import { SignUpUser } from '../../types/User';

const BottomCTA = styled(Button.Full)`
  position: absolute;
  bottom: 0;
  width: calc(100% - 32px);
  margin: 0 14px 12px 14px;
`;

export default function SignUp(props: SignUpUser): JSX.Element {
  const { name } = props;
  const [nickname, onChangeNickname, onClearNickname] = Input.useTextField(
    name || '',
  );
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);

  const handleNext = React.useCallback(() => {
    console.log('abc');
  }, []);
  return (
    <SignupContext.Provider
      value={{
        nickname,
        onChangeNickname,
        onClearNickname,
        ownerType,
        setOwnerType,
      }}
    >
      <NicknameForm />
      <BottomCTA onClick={handleNext}>다음</BottomCTA>
    </SignupContext.Provider>
  );
}
