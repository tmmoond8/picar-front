/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Page from './BasePage';
import { colors } from '../styles';
import Input from '../components/Input';
import Button from '../components/Button';
import Content from '../components/Content';
import API from '../apis';

const OwwnerPage = () => {
  const [email, onChangeEmail] = Input.useTextField('');
  const [password, onChangePassword] = Input.useTextField('');
  const handleSubmit = React.useCallback(async () => {
    const { data } = await API.auth.owwnerLogin({ email, password});
    if (data.ok) {
      window.location.href = '/';
    }
  }, [email, password])
  return (
    <StyledPage>
      <Form onSubmit={e => e.preventDefault()}>
        <Input.TextField id="email" label="이메일" value={email} onChange={onChangeEmail} />
        <Input.TextField id="password" type="password" label="인증키" value={password} onChange={onChangePassword} />
        <Content.Spacing size={32}/>
        <Button.Full onClick={handleSubmit}>로그인</Button.Full>
      </Form>
    </StyledPage>
  );
}

export default OwwnerPage;

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  height: 100%;
  padding: 20px;
  background-color: ${colors.white}
`;