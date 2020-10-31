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

const BobbomCTA = styled(Button.Full)`
  position: absolute;
  bottom: 0;
  width: calc(100%);
  margin: 0 -16px;
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
      <BobbomCTA onClick={handleNext}>다음</BobbomCTA>
    </SignupContext.Provider>
  );
}
