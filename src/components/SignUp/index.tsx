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
import { useStore, observer } from '../../stores';

import API from '../../apis';

interface SignUpProps extends SignUpUser {
  onClose: () => void;
}

const SignUpCarousel = styled(Carousel)`
  margin-top: -60px;
  padding-top: 60px;
  height: 100%;
`;

export default observer(function SignUp(props: SignUpProps): JSX.Element {
  const { name, email, onClose } = props;
  const { user } = useStore();
  const handleChangeStep = React.useCallback((step: number) => {}, []);
  const [step, setStep] = React.useState(0);
  const [lounge, setLounge] = React.useState('');
  const nicknameField = Input.useTextField(name || '');
  const emailField = Input.useTextField(email || '');
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);

  React.useEffect(() => {
    global.__OWNER__.signupFlickingMoveTo(step);
  }, [step]);

  const handleNext = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);

  const handleSignUp = React.useCallback(async () => {
    try {
      const { data } = await API.auth.kakaoLogin({
        ...props,
        name: nicknameField[0],
        email: emailField[0],
        isOwner: ownerType === ownerTypes[0].value,
        group: lounge,
      });
      user.profile = data;
    } catch (error) {
    } finally {
      onClose();
    }
  }, [emailField, lounge, nicknameField, onClose, ownerType, props, user]);

  const signUpSteps = [
    {
      Form: NicknameForm,
      bottomCTA: <NicknameForm.BottomCTA onClick={handleNext} />,
    },
    {
      Form: LoungeForm,
      bottomCTA: <LoungeForm.BottomCTA onClick={handleSignUp} />,
    },
  ];

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
        nicknameField,
        emailField,
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
});
