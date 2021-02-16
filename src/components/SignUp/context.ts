import React from 'react';
import { TextFieldHandler } from '../Input';

export { observer } from 'mobx-react';


const SignUpContext = React.createContext<{
  step: number;
  setStep: (v: number) => void;
  nicknameField: TextFieldHandler;
  emailField: TextFieldHandler;
  ownerType: 'owner' | 'preOwner' | '';
  setOwnerType: (v: 'owner' | 'preOwner' | '') => void;
  onClose: () => void;
  lounge: string;
  setLounge: (v: string) => void;
}>({
  step: 0,
  setStep: () => {},
  nicknameField: ['', () => {}, () => {}],
  emailField: ['', () => {}, () => {}],
  ownerType: '',
  setOwnerType: () => {},
  onClose: () => {},
  lounge: '',
  setLounge: () => {},
});

SignUpContext.displayName = 'SignUpContext';

export const useSignUpContext = () => {
  return React.useContext(SignUpContext);
};

export default SignUpContext;