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

const TextField = styled(Input.TextField)``;
const Switch = styled(Input.Switch)`
  margin-top: 10px;
`;

function NicknameForm(): JSX.Element {
  const { nicknameFiled, ownerType, setOwnerType } = useSignUpContext();

  const [nickname, onChangeNickname, onClearNickname] = nicknameFiled;

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
}

NicknameForm.BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const {
    nicknameFiled: [nickname],
  } = useSignUpContext();

  const disabled = React.useMemo(() => nickname.length < 2, [nickname]);
  return (
    <BottomCTA onClick={onClick} disabled={disabled}>
      다음
    </BottomCTA>
  );
});

export default observer(NicknameForm);
