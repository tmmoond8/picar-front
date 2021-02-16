import React, { ChangeEvent } from 'react';
import { OwnerTypes } from '../SignUp/constants';

export type TextFieldHandler = [string, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, () => void];

export const useTextField = (initialValue: string, skipCondition?: ((value: string) => boolean)): TextFieldHandler => {
  const [value, setValue ] = React.useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (skipCondition && skipCondition(e.target.value)) {
      return;
    }
    setValue(e.target.value ?? '');
  };
  const clear = () => setValue('');
  return [
    value,
    handler,
    clear,
  ]
}

export const useSwitch = (values: OwnerTypes): ['owner' | 'preOwner' | '', (v: 'owner' | 'preOwner' | '') => void] => {
  const [ value, setValue ] = React.useState<'owner' | 'preOwner' | ''>('');
  return [ value, setValue ];
}