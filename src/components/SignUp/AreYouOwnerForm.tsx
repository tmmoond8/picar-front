/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';
import BottomCTA from './BottomCTA';
import Input from '../Input';

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const Switch = styled(Input.Switch)`
  margin-top: 10px;
`;

function AreYouOwner(): JSX.Element {
  const { ownerType, setOwnerType } = useSignUpContext();

  return (
    <Form>
      <Input.Label
        label="오너(사장님)이신가요? "
        subLabel="예비오너는 관심업종을 선택해주세요"
      />
      <Switch
        values={ownerTypes}
        currentValue={ownerType}
        setCurrentValue={setOwnerType}
      />
    </Form>
  );
}

AreYouOwner.BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const {
    nicknameField: [nickname],
  } = useSignUpContext();

  const disabled = React.useMemo(() => nickname.length < 2, [nickname.length]);
  return (
    <BottomCTA onClick={onClick} disabled={disabled}>
      다음
    </BottomCTA>
  );
});

export default observer(AreYouOwner);
