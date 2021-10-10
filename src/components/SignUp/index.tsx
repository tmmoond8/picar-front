/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Carousel from '../Carousel';
import { useSignUpContext, SignUpContextProvider } from './context';
import { ownerTypes } from './constants';
import NicknameForm from './NicknameForm';
import EmailForm from './EmailForm';
import AreYouOwnerForm from './AreYouOwnerForm';
import LoungeForm from './LoungeForm';
import { SignUpUser, Profile } from '../../types/User';
import { crossPlatform, localStorage } from '../../modules';
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

const SignUp: React.FC<SignUpProps> = (props) => {
  const {
    step,
    setStep,
    nicknameField,
    emailField,
    ownerType,
    vendor,
    setVendor,
    model,
    setModel,
    onClose,
  } = useSignUpContext();
  const { util } = useStore();
  const history = util.useHistory();

  React.useEffect(() => {
    global.__OWNER__.signupFlickingMoveTo(step);
  }, [step]);

  const handleNext = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);
  const handlePrev = React.useCallback(() => {
    setStep(step - 1);
    setModel('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, setStep]);

  const handleSignUp = React.useCallback(
    async (group?: string) => {
      try {
        const {
          data: { profile, token },
        } = await API.auth.signup({
          ...props,
          name: nicknameField[0],
          email: emailField[0],
          isOwner: ownerType === ownerTypes[0].value,
          group: group ?? model,
        });
        const openerUUID = localStorage.getUUID();
        if (profile.code) {
          if (openerUUID) {
            localStorage.clearUUID();
          }
          if (crossPlatform.isHybrid()) {
            localStorage.setToken(token);
            window.location.reload();
          }
        }
      } catch (error) {
      } finally {
        onClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      emailField,
      model,
      nicknameField,
      props.onSetUserProfile,
      onClose,
      ownerType,
      props,
    ],
  );

  const BottomCTA = [
    <NicknameForm.BottomCTA onClick={handleNext} />,
    <EmailForm.BottomCTA onClick={handleNext} />,
    <React.Fragment />,
    <React.Fragment />,
    <LoungeForm.BottomCTA onClick={handleSignUp} />,
  ];

  return (
    <React.Fragment>
      <Carousel.Header
        step={step}
        title=""
        onBack={() => setStep(step - 1)}
        onClose={onClose}
      />
      <SignUpCarousel
        id={CAROUSEL.SIGNUP}
        index={step}
        onChangeIndex={(i) => {}}
        gesture={false}
      >
        <NicknameForm />
        <EmailForm />
        <AreYouOwnerForm handleNext={handleNext} />
        <LoungeForm.VendorForm
          handleNext={handleNext}
          setVendor={setVendor}
          setModel={setModel}
          handleSignUp={handleSignUp}
        />
        <LoungeForm.ModelForm
          handlePrev={handlePrev}
          vendor={vendor}
          model={model}
          setModel={setModel}
        />
      </SignUpCarousel>
      {BottomCTA[step]}
    </React.Fragment>
  );
};

const SignUpWithProvider: React.FC<SignUpProps> = (props) => {
  const { email, name, onClose } = props;
  return (
    <SignUpContextProvider email={email} name={name} onClose={onClose}>
      <SignUp {...props} />
    </SignUpContextProvider>
  );
};

export default observer(SignUpWithProvider);
