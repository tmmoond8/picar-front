import React from 'react';
import Input, { TextFieldHandler } from '../Input';
import { ownerTypes } from './constants';

export { observer } from 'mobx-react';

const SignUpContext = React.createContext<{
  step: number;
  setStep: (v: number) => void;
  nicknameField: TextFieldHandler;
  emailField: TextFieldHandler;
  ownerType: 'owner' | 'preOwner' | '';
  setOwnerType: (v: 'owner' | 'preOwner' | '') => void;
  vendor: string;
  setVendor: (v: string) => void;
  onClose: () => void;
  model: string;
  setModel: (v: string) => void;
}>({
  step: 0,
  setStep: () => {},
  nicknameField: ['', () => {}, () => {}],
  emailField: ['', () => {}, () => {}],
  ownerType: '',
  setOwnerType: () => {},
  vendor: '',
  setVendor: () => {},
  onClose: () => {},
  model: '',
  setModel: () => {},
});

SignUpContext.displayName = 'SignUpContext';

export const useSignUpContext = () => {
  return React.useContext(SignUpContext);
};

export default SignUpContext;

export const SignUpContextProvider: React.FC<{
  email?: string;
  name?: string;
  onClose: () => void;
}> = ({ children, email, name, onClose }) => {
  const [step, setStep] = React.useState(0);
  const [model, setModel] = React.useState('');
  const nicknameField = Input.useTextField(name || '');
  const emailField = Input.useTextField(email || '');
  const [ownerType, setOwnerType] = Input.useSwitch(ownerTypes);
  const [vendor, setVendor] = React.useState('');

  return (
    <SignUpContext.Provider
      value={{
        step,
        setStep,
        nicknameField,
        emailField,
        ownerType,
        setOwnerType,
        vendor,
        setVendor,
        onClose,
        model,
        setModel,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
