/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { toast } from 'react-toastify';

import Carousel from '../Carousel';
import SignupContext from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';
import EmailForm from './EmailForm';
import AreYouOwnerForm from './AreYouOwnerForm';
import LoungeForm from './LoungeForm';
import Input from '../Input';
import { SignUpUser, Profile } from '../../types/User';
import stroage from '../../modules/localStorage';
import { CAROUSEL } from '../../types/constants';
import global from '../../types/global';
import { observer, useStore } from '../../stores';

import API from '../../apis';

interface SignUpProps extends SignUpUser {
  onClose: () => void;
  onSetUserProfile: (profile: Profile) => void;
}

const SignUpCarousel = styled(Carousel)`
  margin-top: -60px;
  padding-top: 60px;
  height: 100%;
`;

export default observer(function SignUp(props: SignUpProps): JSX.Element {
  const { name, email, onClose, onSetUserProfile, uuid } = props;
  const { util } = useStore();
  const history  = util.useHistory();
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
      const { data } = await API.auth.kakaoSignUp({
        ...props,
        name: nicknameField[0],
        email: emailField[0],
        isOwner: ownerType === ownerTypes[0].value,
        group: lounge,
      });
      const openerUUID = stroage.getUUID();
      onSetUserProfile(data);
      history.replace('/');
      setTimeout(() => {
        if (openerUUID) {
          stroage.clearUUID();
          window.location.reload();
        } else {
          toast.success('Owwner 앱으로 이동하면 로그인이 완료됩니다.');
        }
      }, 50)
    } catch (error) {
    } finally {
      onClose();
    }
  }, [
    emailField,
    lounge,
    nicknameField,
    onClose,
    onSetUserProfile,
    ownerType,
    props,
  ]);

  const signUpSteps = [
    {
      Form: NicknameForm,
      bottomCTA: <NicknameForm.BottomCTA onClick={handleNext} />,
    },
    {
      Form: EmailForm,
      bottomCTA: <EmailForm.BottomCTA onClick={handleNext} />,
    },
    {
      Form: AreYouOwnerForm,
      bottomCTA: null,
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
      <Carousel.Header 
        step={step} 
        title="회원가입" 
        onBack={() => setStep(step - 1)} 
        onClose={onClose}
      />
      <SignUpCarousel
        id={CAROUSEL.SIGNUP}
        index={step}
        onChangeIndex={handleChangeStep}
        gesture={false}
      >
        {signUpSteps.map(({ Form }) => (
          <Form key={Form.name} handleNext={handleNext} />
        ))}
      </SignUpCarousel>
      {signUpSteps[step].bottomCTA}
    </SignupContext.Provider>
  );
});
