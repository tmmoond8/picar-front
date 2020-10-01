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

export const useTextarea = (
  defaultValue: string,
): [string, (e: React.ChangeEvent<HTMLTextAreaElement>) => void] => {
  const [text, _setText] = React.useState(defaultValue);
  const setText = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      _setText(e.target.value);
    },
    [_setText],
  );
  return [text, setText];
};
