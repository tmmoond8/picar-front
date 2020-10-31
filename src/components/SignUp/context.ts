import React from 'react';

export { observer } from 'mobx-react';

const SignUpContext = React.createContext<{
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearNickname: () => void;
  ownerType: string;
  setOwnerType: (v: string) => void;
  // rounge: string;
  // setRounge: (v: string) => void;
}>({
  nickname: '',
  onChangeNickname: () => {},
  onClearNickname: () => {},
  ownerType: 'owner',
  setOwnerType: () => {},
  // rounge: '',
  // setRounge: () => {},
});

SignUpContext.displayName = 'SignUpContext';

export const useSignUpContext = () => {
  return React.useContext(SignUpContext);
};

export default SignUpContext;