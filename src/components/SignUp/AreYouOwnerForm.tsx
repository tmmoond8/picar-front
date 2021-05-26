/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';
import Input from '../Input';
import Button from '../Button';
import { colors } from '../../styles';

const AreYouOwner: React.FC<{ handleNext: () => void }> = ({ handleNext }) => {
  const { ownerType: selectedOwnerType, setOwnerType } = useSignUpContext();
  const handleClickSelectButton = React.useCallback(
    (ownerType: 'owner' | 'preOwner' | '') => {
      setOwnerType(ownerType);
    },
    [setOwnerType],
  );

  return (
    <Form>
      <Input.Label
        label="전기차 보유중이신가요?"
        subLabel="선택하신 차량 클럽으로 대표라운지가 설정됩니다."
      />
      {ownerTypes.map((ownerType) => (
        <SelectButton
          key={ownerType.value}
          selected={ownerType.value === selectedOwnerType}
          onClick={() => {
            handleClickSelectButton(ownerType.value);
            handleNext();
          }}
        >
          {ownerType.displayName}
        </SelectButton>
      ))}
    </Form>
  );
};

export default observer(AreYouOwner);

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 18px;
`;

const SelectButton = styled(Button.Full) <{ selected: boolean }>`
  justify-content: left;
  padding: 16px 20px;
  background-color: ${(p) =>
    p.selected ? `${colors.blackCC}` : `${colors.blackF5F6F7}`};
  color: ${colors.black22};

  &:first-of-type {
    margin-top: 48px;
  }

  &:nth-of-type(2) {
    margin-top: 8px;
  }
`;
