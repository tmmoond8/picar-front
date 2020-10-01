import React from 'react';

export const useTextInput = (
  defaultValue: string,
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [text, _setText] = React.useState(defaultValue);
  const setText = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      _setText(e.target.value);
    },
    [_setText],
  );
  return [text, setText];
};
