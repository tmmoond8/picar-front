import React from 'react';

export default function useStateRef<T>(defaultValue: T) {
  const [value, setValue] = React.useState<T>(defaultValue);
  const valueRef = React.useRef(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return [value, setValue, valueRef] as const;
}
