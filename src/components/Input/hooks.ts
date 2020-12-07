import React, { ChangeEvent } from 'react';
import { OwnerTypes } from '../SignUp/constants';

export type TextFieldHandler = [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void];

export const useTextField = (initialValue: string): TextFieldHandler => {
  const [value, setValue ] = React.useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value ?? '');
  const clear = () => setValue('');
  return [
    value,
    handler,
    clear,
  ]
}

export const useSwitch = (values: OwnerTypes): ['owner' | 'preOwner', (v: 'owner' | 'preOwner') => void] => {
  const [ value, setValue ] = React.useState<'owner' | 'preOwner'>(values[0].value);
  return [ value, setValue ];
}