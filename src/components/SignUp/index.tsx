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
import Button from '../Button';
import { SignUpUser } from '../../types/User';
import { CAROUSEL } from '../../types/constants';
import global from '../../types/global';

interface SignUpProps extends SignUpUser {
  onClose: () => void;
}

const SignUpCarousel = styled(Carousel)`
  margin-top: -60px;
  padding-top: 60px;
  height: 100%;
`;

const BottomCTA = styled(Button.Full)`
  position: fixed;
  bottom: 0;
  width: calc(100% - 32px);
  margin: 0 16px 12px 16px;
  z-index: 2500;
`;

export default function SignUp(props: SignUpProps): JSX.Element {
  const { name, onClose } = props;
  const handleChangeStep = React.useCallback((step: number) => {}, []);
  const [step, setStep] = React.useState(1);
  const [lounge, setLounge] = React.useState('');
  const [nickname, onChangeNickname, onClearNickname] = Input.useTextField(
    name || '',
  );
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);
  const signUpSteps = [<NicknameForm />, <RoungeForm />];

  React.useEffect(() => {
    global.__OWNER__.signupFlickingMoveTo(step);
  }, [step]);

  const handleNext = React.useCallback(() => {
    console.log('abcsdf');
    setStep(step + 1);
  }, [step, setStep]);

  const disabled = React.useMemo(() => nickname.length < 3, [nickname]);

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
        lounge,
        setLounge,
      }}
    >
      <SignUpHeader />
      <SignUpCarousel
        id={CAROUSEL.SIGNUP}
        index={step}
        onChangeIndex={handleChangeStep}
        gesture={false}
      >
        {signUpSteps}
      </SignUpCarousel>

      <BottomCTA onClick={handleNext} disabled={disabled}>
        다음
      </BottomCTA>
    </SignupContext.Provider>
  );
}
