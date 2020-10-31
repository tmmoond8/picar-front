/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Carousel from '../Carousel';
import SignupContext from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';
import RoungeForm from './RoungeForm';

import Input from '../Input';
import Button from '../Button';

import { SignUpUser } from '../../types/User';

const BottomCTA = styled(Button.Full)`
  position: absolute;
  bottom: 0;
  width: calc(100% - 32px);
  margin: 0 14px 12px 14px;
`;

interface SignUpProps extends SignUpUser {
  onClose: () => void;
}

export default function SignUp(props: SignUpProps): JSX.Element {
  const { name, onClose } = props;
  const handleChangeStep = React.useCallback((step: number) => {
    console.log('step', step);
  }, []);
  const [step, setStep] = React.useState(0);
  const flickingRef = React.useRef(null);
  const [nickname, onChangeNickname, onClearNickname] = Input.useTextField(
    name || '',
  );
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);

  const handleNext = React.useCallback(() => {
    console.log('handleNext');
  }, []);

  const signUpSteps = [<NicknameForm />, <RoungeForm />];

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
      <Carousel index={step} onChangeIndex={handleChangeStep} gesture={false}>
        {signUpSteps}
      </Carousel>

      <BottomCTA onClick={handleNext}>다음</BottomCTA>
    </SignupContext.Provider>
  );
}
