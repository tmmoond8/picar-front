import React, { ChangeEvent } from 'react';

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

export const useSwitch = (values: { value: string; displayName: string}[]): [string, (v: string) => void] => {
  const [ value, setValue ] = React.useState(values[0].value);
  return [ value, setValue ];
}