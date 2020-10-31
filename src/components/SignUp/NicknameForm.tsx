/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Input from '../Input';
import { ownerTypes } from './constants';
import { useSignUpContext, observer } from './context';

const Form = styled.form`
  height: 100vh;
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
