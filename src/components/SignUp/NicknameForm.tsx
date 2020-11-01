/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';
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

export default observer(function NicknameForm(): JSX.Element {
  const {
    nickname,
    onChangeNickname,
    onClearNickname,
    ownerType,
    setOwnerType,
  } = useSignUpContext();

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
    </Form>
  );
});
