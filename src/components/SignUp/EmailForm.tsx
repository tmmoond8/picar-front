/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import validator from 'validator';

import { useSignUpContext, observer } from './context';
import Button from '../Button';
import Input from '../Input';

function EmailForm(): JSX.Element {
  const { emailField } = useSignUpContext();

  const [email, onChangeEmail, onClearEmail] = emailField;

  return (
    <Form>
      <Input.Label
        label="어떤 이메일 주소로 보낼까요?"
        subLabel="정보성 이메일을 전달하는 용도로만 사용되요"
      />
      <Input.TextField
        id="signup-email"
        onChange={onChangeEmail}
        value={email}
        placeholder="이메일을 입력해주세요"
        onClear={onClearEmail}
        autocomplete={true}
      />
    </Form>
  );
}

EmailForm.BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const {
    emailField: [email],
  } = useSignUpContext();

  const disabled = React.useMemo(() => !validator.isEmail(email), [email]);
  return (
    <Button.BottomCTA onClick={onClick} disabled={disabled}>
      다음
    </Button.BottomCTA>
  );
});

export default observer(EmailForm);

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 18px;
`;
