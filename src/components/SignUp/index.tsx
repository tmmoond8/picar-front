/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import Carousel from '../Carousel';
import SignupContext from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';
import LoungeForm from './LoungeForm';
import SignUpHeader from './SignUpHeader';

import Input from '../Input';
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

export default function SignUp(props: SignUpProps): JSX.Element {
  const { name, onClose, email } = props;
  const handleChangeStep = React.useCallback((step: number) => {}, []);
  const [step, setStep] = React.useState(0);
  const [lounge, setLounge] = React.useState('');
  const [nickname, onChangeNickname, onClearNickname] = Input.useTextField(
    name || '',
  );
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);

  React.useEffect(() => {
    global.__OWNER__.signupFlickingMoveTo(step);
  }, [step]);

  const handleNext = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);

  const signUpSteps = [
    {
      Form: NicknameForm,
      bottomCTA: <NicknameForm.BottomCTA onClick={handleNext} />,
    },
    {
      Form: LoungeForm,
      bottomCTA: <LoungeForm.BottomCTA onClick={() => console.log('join')} />,
    },
  ];

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
        {signUpSteps.map(({ Form }) => (
          <Form key={Form.name} />
        ))}
      </SignUpCarousel>
      {signUpSteps[step].bottomCTA}
    </SignupContext.Provider>
  );
}
