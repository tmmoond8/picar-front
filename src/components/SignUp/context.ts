import React from 'react';

export { observer } from 'mobx-react';

const SignUpContext = React.createContext<{
  step: number;
  setStep: (v: number) => void;
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearNickname: () => void;
  ownerType: string;
  setOwnerType: (v: string) => void;
  onClose: () => void;
  lounge: string;
  setLounge: (v: string) => void;
}>({
  step: 0,
  setStep: () => {},
  nickname: '',
  onChangeNickname: () => {},
  onClearNickname: () => {},
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