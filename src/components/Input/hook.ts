import React, { ChangeEvent } from 'react';

export const useTextField = (initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [value, setValue ] = React.useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value ?? '');
  const clear = () => setValue('');
  return [
    value,
    handler,
    clear,
  ]
}

export const useSwitch = (values: string[]) => {
  const [currentValue, setCurrentValue ] = React.useState(values[0]);
  return {
    values,
    currentValue,
    setCurrentValue
  }
}