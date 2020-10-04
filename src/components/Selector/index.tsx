/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';

import { colors } from '../../styles';

interface SelectorProps {
  items: string[];
  handleChange: (value: string) => void;
}

export default function Selector(props: SelectorProps): JSX.Element {
  const { items, handleChange } = props;

  const handleChangeSelect = React.useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      handleChange(e.target.value as string);
    },
    [handleChange],
  );
  return (
    <StyledSelector onChange={handleChangeSelect}>
      {items.map((item) => (
        <option value={item}>{item}</option>
      ))}
    </StyledSelector>
  );
}

const StyledSelector = styled.select`
  height: 24px;
  padding: 0 15px 0 0;
  outline: none;
  border: none;
  font-size: 16px;
  color: ${colors.black22};
  appearance: none;
`;

export const useSelector = (items: string[], defaultValue?: string) => {
  return React.useState<string>(() =>
    items.length > 0 ? defaultValue || items[0] : '',
  );
};
