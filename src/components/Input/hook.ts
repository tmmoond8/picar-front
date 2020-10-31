import React, { ChangeEvent } from 'react';
export const useTextField = (initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue ] = React.useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value ?? '');
  
  return [
    value,
    handler
  ]
}