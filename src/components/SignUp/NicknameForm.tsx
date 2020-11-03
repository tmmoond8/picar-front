/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import validator from 'validator';

import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';
import BottomCTA from './BottomCTA';
import Input from '../Input';

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const TextField = styled(Input.TextField)``;
const Switch = styled(Input.Switch)`
  margin-top: 10px;
`;

function NicknameForm(): JSX.Element {
  const {
    nicknameField,
    emailField,
    ownerType,
    setOwnerType,
  } = useSignUpContext();

  const [nickname, onChangeNickname, onClearNickname] = nicknameField;
  const [email, onChangeEmail, onClearEmail] = emailField;

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
      <TextField
        id="signup-email"
        label="이메일"
        onChange={onChangeEmail}
        value={email}
        placeholder="이메일을 입력해주세요"
        onClear={onClearEmail}
        autocomplete={true}
      />
      <Switch
        label="직업"
        values={ownerTypes}
        currentValue={ownerType}
        setCurrentValue={setOwnerType}
      />
    </Form>
  );
}

NicknameForm.BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const {
    nicknameField: [nickname],
    emailField: [email],
  } = useSignUpContext();

  const disabled = React.useMemo(
    () => nickname.length < 2 || !validator.isEmail(email),
    [email, nickname.length],
  );
  return (
    <BottomCTA onClick={onClick} disabled={disabled}>
      다음
    </BottomCTA>
  );
});

export default observer(NicknameForm);
