import React from 'react';
import { TextFiledHandler } from '../Input';

export { observer } from 'mobx-react';

const SignUpContext = React.createContext<{
  step: number;
  setStep: (v: number) => void;
  nicknameFiled: TextFiledHandler;
  ownerType: string;
  setOwnerType: (v: string) => void;
  onClose: () => void;
  lounge: string;
  setLounge: (v: string) => void;
}>({
  step: 0,
  setStep: () => {},
  nicknameFiled: ['', () => {}, () => {}],
  ownerType: 'owner',
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