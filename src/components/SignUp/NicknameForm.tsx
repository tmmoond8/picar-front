/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useSignUpContext, observer } from './context';
import BottomCTA from './BottomCTA';
import Input from '../Input';

function NicknameForm(): JSX.Element {
  const { nicknameField } = useSignUpContext();

  const [nickname, onChangeNickname, onClearNickname] = nicknameField;

  return (
    <Form>
      <Input.Label
        label="어떤 닉네임으로 활동하시겠어요?"
        subLabel="9자이내 특수문자를 제외하고 작성가능해요"
      />
      <Input.TextField
        id="signup-nickname"
        onChange={onChangeNickname}
        value={nickname}
        placeholder="닉네임을 입력해주세요"
        onClear={onClearNickname}
        autocomplete={false}
      />
    </Form>
  );
}

NicknameForm.BottomCTA = observer((props: { onClick: () => void }) => {
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

export default observer(NicknameForm);

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 16px;
`;
