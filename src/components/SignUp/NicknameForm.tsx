/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';
import Input from '../Input';
import Button from '../Button';

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const TextField = styled(Input.TextField)``;
const Switch = styled(Input.Switch)`
  margin-top: 10px;
`;

const BottomCTA = styled(Button.Full)`
  position: fixed;
  bottom: 0;
  width: calc(100% - 32px);
  margin: 0 0 12px 0;
`;

export default observer(function NicknameForm(): JSX.Element {
  const {
    nickname,
    onChangeNickname,
    onClearNickname,
    ownerType,
    setOwnerType,
    step,
    setStep,
  } = useSignUpContext();

  const handleNext = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);

  const disabled = React.useMemo(() => nickname.length < 3, [nickname]);

  return (
    <Form>
      <TextField
        id="signup-nickname"
        label="닉네임"
        onChange={onChangeNickname}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
        onClear={onClearNickname}
        autocomplete={false}
      />
      <Switch
        label="직업"
        values={ownerTypes}
        currentValue={ownerType}
        setCurrentValue={setOwnerType}
      />
      <BottomCTA onClick={handleNext} disabled={disabled}>
        다음
      </BottomCTA>
    </Form>
  );
});
