/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Carousel from '../Carousel';
import SignupContext from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';
import RoungeForm from './RoungeForm';
import SignUpHeader from './SignUpHeader';

import Input from '../Input';

import { SignUpUser } from '../../types/User';

interface SignUpProps extends SignUpUser {
  onClose: () => void;
}

const SignUpCarousel = styled(Carousel)`
  margin-top: -60px;
  padding-top: 60px;
  height: 100vh;
`;

export default function SignUp(props: SignUpProps): JSX.Element {
  const { name, onClose } = props;
  const handleChangeStep = React.useCallback((step: number) => {
    console.log('step', step);
  }, []);
  const [step, setStep] = React.useState(0);
  const [nickname, onChangeNickname, onClearNickname] = Input.useTextField(
    name || '',
  );
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);

  const signUpSteps = [<NicknameForm />, <RoungeForm />];

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
        nickname,
        onChangeNickname,
        onClearNickname,
        ownerType,
        setOwnerType,
        onClose,
      }}
    >
      <SignUpHeader />
      <SignUpCarousel
        index={step}
        onChangeIndex={handleChangeStep}
        gesture={false}
      >
        {signUpSteps}
      </SignUpCarousel>
    </SignupContext.Provider>
  );
}
